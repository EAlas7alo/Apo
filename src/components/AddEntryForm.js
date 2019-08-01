import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native'
import TextInputNamed from './TextInputNamed'
import AttachmentBar from './AttachmentBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dimgray',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  metaBar: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  attachmentBar: {
    backgroundColor: 'snow',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  contentBar: {
    flex: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
})

const AddEntryForm = ({ handleChange, handleBlur, title, textContent, images, onPressImage }) => {
  console.log('images at AddEntryForm', images)
  return (
    <Formik
      initialValues={{ title: '', url: '', textContent: '' }}
      onSubmit={(values) => {
        alert('adding', values)
      }}
    >
      <View style={styles.container}>
        <View style={styles.metaBar}>
          <TextInputNamed
            autoFocus
            placeholder="Enter a title"
            placeholderTextColor="lightgrey"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur('title')}
            value={title}
          />
        </View>
        <View style={styles.attachmentBar}>
          <AttachmentBar onPress={onPressImage} images={images} />
        </View>
        <View style={styles.contentBar}>
          <TextInputNamed
            placeholder="Write your entry here"
            placeholderTextColor="lightgrey"
            name="textContent"
            onChange={handleChange}
            onBlur={handleBlur('textContent')}
            value={textContent}
            numberOfLines={1}
            multiline
          />
        </View>
      </View>
    </Formik>
  )
}

AddEntryForm.defaultProps = {
  images: null,
}

AddEntryForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  textContent: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  onPressImage: PropTypes.func.isRequired,

}

export default AddEntryForm
