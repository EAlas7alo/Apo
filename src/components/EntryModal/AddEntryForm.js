import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native'
import TextInputNamed from '../TextComponents/TextInputNamed'
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

const AddEntryForm = ({ handleChange, title, textContent, onPressImage, id }) => {
  return (
    <Formik
      initialValues={{ title: '', url: '', textContent: '' }}
      onSubmit={(values) => {
      }}
    >
      <View style={styles.container}>
        <View style={styles.metaBar}>
          <TextInputNamed
            placeholder="Enter a title"
            placeholderTextColor="lightgrey"
            name="title"
            onChange={handleChange}
            value={title}
          />
        </View>
        <View style={styles.attachmentBar}>
          <AttachmentBar id={id} onPress={onPressImage} />
        </View>
        <View style={styles.contentBar}>
          <TextInputNamed
            placeholder="Write your entry here"
            placeholderTextColor="lightgrey"
            name="textContent"
            onChange={handleChange}
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
  id: null,
}

AddEntryForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  textContent: PropTypes.string.isRequired,
  onPressImage: PropTypes.func.isRequired,
  id: PropTypes.string,

}

export default AddEntryForm
