import React from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'

const styles = StyleSheet.create({
  imageSize: {
    width: 50,
    height: 50,
  },
})

const AttachmentBar = ({ images }) => {
  console.log(images)
  return (
    <View>
      {images.length > 0 
        ? (
          <FlatList
            data={images}
            horizontal={true}
            keyExtractor={(item, index) => item}
            renderItem={({ item }) => (
              <Image key={item} source={{ uri: item }} style={styles.imageSize} />
            )}
          />
        )
        : <Text>No attachments</Text> }
    </View>
  )
}

export default AttachmentBar
