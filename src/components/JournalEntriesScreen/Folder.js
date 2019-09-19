import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ApoText } from '../StyledComponents'

const FolderView = styled.View`
  padding: 25px
  flex-direction: row
`

const FolderText = styled(ApoText)`
  align-self: center
  padding-left: 20
  font-size: 25
`

const Folder = ({ item }) => {
  return (
    <FolderView>
      <Icon name="md-folder-open" size={40} color="white" />
      <FolderText>{item.name}</FolderText>
    </FolderView>
  )
}

Folder.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default Folder
