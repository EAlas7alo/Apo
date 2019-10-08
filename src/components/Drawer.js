import React from 'react'
import { AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import { Header, ApoText } from './StyledComponents'

const ME = gql`
  {
    me {
      username
    }
  }
`

const DrawerView = styled.SafeAreaView`
  padding-top: 50px
  flex: 1
  background-color: dimgray
`

const DrawerHeader = styled(Header)`
  border-bottom-width: 1px
  border-color: white
`

const MenuItemsView = styled.View`
  color: white
  border-bottom-width: 1px
  border-color: white
`

const LogoutButton = styled.TouchableOpacity`
  margin-top: 10px
`

const LogOutText = styled(ApoText)`
  padding-left: 18px
`

const Drawer = (props) => {
  const { data: { me }, loading } = useQuery(ME)
  const client = useApolloClient()
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken')
      client.resetStore()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
    props.navigation.navigate('SignIn')
  }
  if (loading) return null
  return (
    <DrawerView>
      <DrawerHeader>
        Menu {'\n'}
        Logged in as {me.username}
      </DrawerHeader>
      <MenuItemsView>
        <DrawerNavigatorItems
          activeBackgroundColor="dimgray"
          activeTintColor="white"
          {...props}
        />

      </MenuItemsView>
      <LogoutButton
        onPress={handleLogout}
      >
        <LogOutText>
          Logout
        </LogOutText>
      </LogoutButton>
    </DrawerView>
  )
}

Drawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default Drawer
