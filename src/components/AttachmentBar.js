import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View, Text, FlatList } from 'react-native'
import AttachmentView from './AttachmentView'

const AttachmentBar = ({ images, onPress }) => {
  // console.log('images sent to AttachmentBar: ', images)
  if (!images) return null
  return (
    <View>
      {images.length > 0
        ? (
          <FlatList
            data={images}
            horizontal
            keyExtractor={(item, index) => item}
            renderItem={({ item }) => (
              <AttachmentView key={item} item={item} onPress={onPress} />
            )}
          />
        )
        : <Text>No attachments</Text> }
    </View>
  )
}

AttachmentBar.defaultProps = {
  images: null,
}

AttachmentBar.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func.isRequired,

}

export default AttachmentBar
