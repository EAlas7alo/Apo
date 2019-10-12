import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { AsyncStorage } from 'react-native'
import { Formik } from 'formik'
import { SwitchActions } from 'react-navigation'
import styled from 'styled-components'
import { Container } from '../StyledComponents'
import { LOGIN } from './queries'

const SignInScreenView = styled(Container)`

`

const FormView = styled.View`
  margin-top: 200px
`

const SignInInput = styled.TextInput`
  margin: 0px 25px 0px
  color: white
  padding-bottom: 5px
  font-size: 15
  border-bottom-width: 1px
  border-color: snow
`

const ApoHeader = styled.Text`
  color: snow
  font-size: 50
  align-self: center
`

const LoginText = styled.Text`
  color: snow
  font-size: 25
  padding: 5px
`

const LoginButton = styled.TouchableOpacity`
  margin-top: 5px
  align-self: center
  border-width: 1px
  border-color: white
  border-radius: 25
  background-color: slategray
`
const InfoText = styled.Text`
  color: yellow
  align-self: center
`

const SignUpButton = styled.TouchableOpacity`
  border-radius: 25
  border-width: 1px
  border-color: white
  padding: 10px
  background-color: gray
  align-self: center
  margin-top: 50px
`

const SignUpText = styled.Text`
  color: snow
`

const SignInScreen = ({ navigation }) => {
  const [loggingIn, setLoggingIn] = useState(false)
  const [login] = useMutation(LOGIN)
  const [infoField, setInfoField] = useState('')

  const handleLogin = async (username, password) => {
    setLoggingIn(true)
    try {
      const { data: { login: { value } } } = await login({ variables: { username, password } })
      if (value) {
        try {
          await AsyncStorage.setItem('userToken', value)
        } catch (error) {
          console.log(error)
        }
        setLoggingIn(false)
        navigation.dispatch(SwitchActions.jumpTo({ routeName: 'App' }))
      }
    } catch (error) {
      setLoggingIn(false)
      setInfoField('Wrong username or password')
      setTimeout(() => {
        setInfoField('')
      }, 5000)
    }
  }

  const handleSignUp = () => {
    navigation.navigate('Signup')
  }

  return (
    <SignInScreenView>
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={values => {
          const errors = {}
          if (!values.username) {
            errors.username = 'Required'
          }
          if (!values.password) {
            errors.password = 'Required'
          }
        }}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values.username, values.password)
          resetForm()
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
        }) => (
          <FormView>
            <ApoHeader>
              Apo
            </ApoHeader>
            <InfoText>
              {infoField}
            </InfoText>
            <SignInInput
              name="username"
              placeholder="Username"
              placeholderTextColor="lightgrey"
              value={values.username}
              onChangeText={handleChange('username')}
            />
            <SignInInput
              name="password"
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="lightgrey"
              value={values.password}
              onChangeText={handleChange('password')}
            />
            <LoginButton
              onPress={handleSubmit}
            >
              <LoginText>
                Login
              </LoginText>
            </LoginButton>
          </FormView>
        )}
      </Formik>
      <SignUpButton onPress={handleSignUp}>
        <SignUpText>
          Sign up
        </SignUpText>
      </SignUpButton>
    </SignInScreenView>
  )
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default SignInScreen
