import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, DatePickerAndroid } from 'react-native'
import { Formik } from 'formik'
import TextInputNamed from './TextInputNamed';


const ReminderForm = ({ title }) => {

  

  return (
    <View>
      <Formik
        initialValues={{ title: '' }}
      >
        <View>
          <TextInputNamed
            placeholder="Enter a title"
            placeholderTextColor="lightgrey"
            name="title"
            value={title}
          />
        </View>
      </Formik>
    </View>
  )
}

ReminderForm.defaultProps = {
  title: '',
}

ReminderForm.propTypes = {
  title: PropTypes.string,
}

export default ReminderForm
