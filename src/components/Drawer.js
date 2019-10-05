import React from 'react'
import { AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import { Header, ApoText } from './StyledComponents'

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

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('userToken', null)
      console.log('xD')
    } catch (error) {
      console.log(error)
    }

    props.navigation.navigate('SignIn')
  }

  return (
    <DrawerView>
      <DrawerHeader>
        Menu
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

  }).isRequired,
}

export default Drawer
