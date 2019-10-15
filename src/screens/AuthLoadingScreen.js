import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator,
  AsyncStorage,
} from 'react-native'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'

const ActivityIndicatorView = styled.View`
  margin-top: 200px
`

const AuthLoadingScreen = ({ navigation }) => {
  const client = useApolloClient()
  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken')
      client.writeData({
        data: {
          currentEntry: null,
          currentImages: [],
          selectedImages: [],
          selectedEntries: [],
          selectedFolders: [],
        },
      })
      navigation.navigate(userToken ? 'App' : 'SignIn')
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
