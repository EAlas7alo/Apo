import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Text, TouchableHighlight, View, Image, StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    margin: 15,
  },
  wrapperView: {
    margin: 50,
    backgroundColor: '#00000080',
  },
  imageView: {
    backgroundColor: 'snow',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.8,
  },
})

const ImageModal = ({ visible, setVisible, image }) => {
  console.log('imageUri at ImageModal: ', image)
  return (
    <Modal
      transparent
      style={styles.modalView}
      animationType="fade"
      visible={visible}
    >
      <View style={styles.wrapperView}>
        <View style={styles.imageView} transparent={false}>
          <TouchableHighlight onPress={() => setVisible(false)}>
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          </TouchableHighlight>
        </View>
      </View>
    </Modal>

  )
}

ImageModal.defaultProps = {
  image: null,
}

ImageModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  image: PropTypes.string,
}

export default ImageModal
