import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Formik } from 'formik'
import styled from 'styled-components'
import { Container } from '../StyledComponents'

const FormView = styled.View`
  margin-top: 200px
`

const UserInput = styled.TextInput`
  color: snow
  font-size: 25
`

const SignupButton = styled.TouchableOpacity`

`

const RegistrationScreen = ({ navigation }) => {

  return (
    <Container>
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
          //handleLogin(values.username, values.password)
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
        }) => (
          <FormView>
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
              placeholder="Enter your password here"
              placeholderTextColor="lightgrey"
              value={values.password}
              onChangeText={handleChange('password')}
            />
          </FormView>
        )}
      </Formik>
    </Container>
  )
}

RegistrationScreen.propTypes = {
  navigation: PropTypes.shape({

  }).isRequired,
}

export default RegistrationScreen
