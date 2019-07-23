import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native'
import TextInputNamed from './TextInputNamed'

const styles = StyleSheet.create({
  fieldName: {
    fontSize: 20,
  },
  inputField: {
    fontSize: 15,
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
      <View>
        <TextInputNamed
          name="title"
          onChange={handleChange}
          onBlur={handleBlur('title')}
          value={title}
        />
        <TextInputNamed
          name="url"
          onChange={handleChange}
          onBlur={handleBlur('url')}
          value={url}
        />
        <TextInputNamed
          name="textContent"
          onChange={handleChange}
          onBlur={handleBlur('textContent')}
          value={textContent}
        />
        <Button onPress={handleSubmit} title="Submit" />
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
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  textContent: PropTypes.string.isRequired,

}

export default AddEntryForm
