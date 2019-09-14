import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View, Text } from 'react-native'
import JournalEntry from './JournalEntry'

const ListItem = (props) => {
  const { item } = props
  console.log(item.type)


  return (
    <View>
      {item.type === 'folder' && (
        <Text>Folder name here</Text>
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
