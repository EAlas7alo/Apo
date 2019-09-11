import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import { Header, Button, ButtonText } from './StyledComponents'

const DrawerView = styled.SafeAreaView`
  padding-top: 50px
  flex: 1
  background-color: dimgray
`

const MenuItemsView = styled.View`
  color: white
`

const Drawer = (props) => {

  return (
    <DrawerView>
      <Header>
        Menu
      </Header>
      <MenuItemsView>
        <DrawerNavigatorItems color="white" {...props} />
      </MenuItemsView>
    </DrawerView>
  )
}

Drawer.propTypes = {
  navigation: PropTypes.shape({

  }).isRequired,
}

export default Drawer
