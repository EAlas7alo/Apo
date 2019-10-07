import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator,
  AsyncStorage,
} from 'react-native'
import styled from 'styled-components'

const ActivityIndicatorView = styled.View`
  margin-top: 200px
`

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken')
      navigation.navigate(userToken ? 'App' : 'SignIn')
      console.log(userToken)
    }
    fetchToken()
  }, [])

  return (
    <ActivityIndicatorView>
      <ActivityIndicator size={60} />
    </ActivityIndicatorView>
  )
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default AuthLoadingScreen
