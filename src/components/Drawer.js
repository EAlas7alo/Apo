import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import { Header } from './StyledComponents'

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

const Drawer = (props) => {
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
    </DrawerView>
  )
}

Drawer.propTypes = {
  navigation: PropTypes.shape({

  }).isRequired,
}

export default Drawer
