import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native'
import TextInputNamed from './TextInputNamed'

const styles = StyleSheet.create({
  entryView: {
    flex: 1,
  },
  metaBar: {
    flex: 1,
    backgroundColor: 'powderblue',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  contentBar: {
    flex: 6,
  },
})


const AddEntryForm = ({ handleChange, handleBlur, handleSubmit, title, url, textContent }) => {
  return (
    <Formik
      initialValues={{ title: '', url: '', textContent: '' }}
      onSubmit={(values) => {
        alert('adding', values)
      }}
    >
      <View style={styles.entryView}>
        <View style={styles.metaBar}>
          <TextInputNamed
            placeholder="Enter a title"
            placeholderTextColor="gray"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur('title')}
            value={title}
          />
          <TextInputNamed
            placeholder="Enter a URL"
            placeholderTextColor="gray"
            name="url"
            onChange={handleChange}
            onBlur={handleBlur('url')}
            value={url}
          />
        </View>
        <View style={styles.contentBar}>
          <TextInputNamed
            placeholder="Write your entry here"
            placeholderTextColor="gray"
            name="textContent"
            onChange={handleChange}
            onBlur={handleBlur('textContent')}
            value={textContent}
            numberOfLines={6}
            multiline={true}
          />
        </View>
      </View>
    </Formik>
  )
}

AddEntryForm.defaultProps = {
  url: null,
}

AddEntryForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  textContent: PropTypes.string.isRequired,

}

export default AddEntryForm
