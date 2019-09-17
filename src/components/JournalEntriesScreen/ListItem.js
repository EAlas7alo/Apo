import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View, Text } from 'react-native'
import JournalEntry from './JournalEntry'
import { ApoText, Header } from '../StyledComponents'

const FolderText = styled(ApoText)`
  padding-left: 15
`

const FolderHeader = styled(ApoText)`
  font-size: 20
  padding-left: 15
`

const ListItem = (props) => {
  const { item } = props
  console.log(item.type)

  return (
    <View>
      {item.type === 'folder' && (
        <FolderHeader>Folder name here</FolderHeader>
      )}
      {item.type === 'entry' && (
        <JournalEntry
          id={item.id.toString()}
          images={item.images}
          title={item.title}
          content={item.content}
        />
      )}
    </View>
  )
}

ListItem.defaultProps = {

}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    content: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
}

export default ListItem
