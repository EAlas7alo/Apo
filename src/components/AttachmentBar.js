import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet, FlatList, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
  imageSize: {
    width: 75,
    height: 75,
  },
})

const AttachmentBar = ({ images, onPress }) => {
  console.log(images)
  return (
    <View>
      {images.length > 0
        ? (
          <FlatList
            data={images}
            horizontal
            keyExtractor={(item, index) => item}
            renderItem={({ item }) => (
              <TouchableHighlight key={item} onPress={() => onPress(item)}>
                <Image source={{ uri: item }} style={styles.imageSize} />
              </TouchableHighlight>
            )}
          />
        )
        : <Text>No attachments</Text> }
    </View>
  )
}

AttachmentBar.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPress: PropTypes.func.isRequired,

}

export default AttachmentBar
