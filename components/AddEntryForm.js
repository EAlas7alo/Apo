import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { View, ToolbarAndroid, StyleSheet, Button } from 'react-native'
import TextInputNamed from './TextInputNamed'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dimgray',
  },
  metaBar: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    paddingTop: 5,
  },
  contentBar: {
    flex: 10,
  },
})

const AddEntryForm = ({ handleChange, handleBlur, title, textContent }) => {
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
            autoFocus={true}
            placeholder="Enter a title"
            placeholderTextColor="lightgrey"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur('title')}
            value={title}
          />
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
