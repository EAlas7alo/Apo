import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { ActivityIndicator, AsyncStorage } from 'react-native'
import { Formik } from 'formik'
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
`
const OptionsText = styled.Text`
  color: snow
`

const SignInScreen = ({ navigation }) => {
  const [loggingIn, setLoggingIn] = useState(false)
  const [token, setToken] = useState(null)
  const [login] = useMutation(LOGIN)

  const handleLogin = async (username, password) => {
    setLoggingIn(true)
    const { data: { login: { value } } } = await login({ variables: { username, password } })
    console.log(token)
    if (value) {
      await AsyncStorage.setItem('userToken', value)
    }
    setLoggingIn(false)
  }

  return (
    <SignInScreenView>
      <Formik
        initialValues={{ username: '', password: ''}}
        validate={values => {
          let errors = {}
          if (!values.username) {
            errors.username = 'Required'
          }
          if (!values.password) {
            errors.password = 'Required'
          }
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values.username, values.password)
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <FormView>
            <ApoHeader>
              Apo
            </ApoHeader>
            <SignInInput
              name="username"
              placeholder="Username"
              placeholderTextColor="lightgrey"
              value={values.username}
              onChangeText={handleChange('username')}
            />
            <SignInInput
              name="password"
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
    </SignInScreenView>
  )
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({

  }).isRequired,
}

export default SignInScreen
