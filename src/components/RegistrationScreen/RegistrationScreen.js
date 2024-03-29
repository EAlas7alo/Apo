import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, AsyncStorage, BackHandler } from 'react-native'
import { Formik } from 'formik'
import { SwitchActions, withNavigationFocus } from 'react-navigation'
import { useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Container } from '../StyledComponents'
import { CREATE_USER, LOGIN } from './queries'

const RegisterScreenView = styled(Container)`
  
`

const UserInput = styled.TextInput`
  margin: 0px 25px 0px
  margin-bottom: 20px
  color: snow
  font-size: 20
  border-bottom-width: 1px
  border-color: white
`
const FormView = styled.View`
  margin-top: 200px
`

const SignupButton = styled.TouchableOpacity`
  margin-top: 5px
  align-self: center
  border-width: 1px
  border-color: white
  border-radius: 25
  padding: 10px
`

const SignUpHeader = styled.Text`
  margin-bottom: 50px
  color: snow
  font-size: 35
  align-self: center
`

const SignupText = styled.Text`
  color: snow
`

const ErrorText = styled.Text`
  background-color: black
  align-self: center
  color: red
`

const RegistrationScreen = ({ navigation, isFocused }) => {
  const [createUser] = useMutation(CREATE_USER)
  const [loading, setLoading] = useState(false)
  const [login] = useMutation(LOGIN)
  const [infoField, setInfoField] = useState('')

  const handleSignUp = async (username, password) => {
    try {
      setLoading(true)
      await createUser({
        variables: {
          username,
          password,
        } })
      const { data: { login: { value } } } = await login({
        variables: {
          username,
          password,
        },
      })
      await AsyncStorage.setItem('userToken', value)
      setLoading(false)
      navigation.dispatch(SwitchActions.jumpTo({ routeName: 'App' }))
    } catch (error) {
      setInfoField('Username minimun length is 3 characters')
      setLoading(false)
      setTimeout(() => {
        setInfoField('')
      }, 5000)
    }
  }

  const handleBackPress = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (!isFocused) {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    } else {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    }
  }, [isFocused])

  return (
    <RegisterScreenView>
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
        onSubmit={(values) => {
          handleSignUp(values.username, values.password)
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
        }) => (
          <FormView>
            <SignUpHeader>
              Registration
            </SignUpHeader>
            {infoField.length > 0 && (
              <ErrorText>
                {infoField}
              </ErrorText>
            )}
            <UserInput
              name="username"
              placeholder="Please enter a username"
              placeholderTextColor="lightgrey"
              value={values.username}
              onChangeText={handleChange('username')}
            />
            <UserInput
              name="password"
              secureTextEntry
              placeholder="Please enter a password"
              placeholderTextColor="lightgrey"
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {!loading
              ? (
                <SignupButton onPress={handleSubmit}>
                  <SignupText>
                    Sign up
                  </SignupText>
                </SignupButton>
              )
              : (<ActivityIndicator />)
            }

          </FormView>
        )}
      </Formik>
    </RegisterScreenView>
  )
}

RegistrationScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}

export default withNavigationFocus(RegistrationScreen)
