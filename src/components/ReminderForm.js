import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, DatePickerAndroid, Image } from 'react-native'
import { Formik } from 'formik'
import styled from 'styled-components'
import TextInputNamed from './TextInputNamed';
import { calendarIcon } from '../constants/Icons'

const DateButton = styled.TouchableHighlight`

`

const ReminderForm = (props) => {
  const [reminderTitle, setReminderTitle] = useState('')
  const [date, setDate] = useState(new Date())

  const handleTitleChange = (name, text) => {
    setReminderTitle(text)
    console.log('set textinput value to', text)
  }

  const handleDateChange = () => {

  }

  return (
    <View>
      <Formik
        initialValues={{ reminderTitle: '' }}
      >
        <View>
          <TextInputNamed
            placeholder="Enter a reminder title"
            placeholderTextColor="lightgrey"
            name="reminderTitle"
            value={reminderTitle}
            onChange={handleTitleChange}
          />
          <DateButton>
            {calendarIcon}
          </DateButton>
        </View>
      </Formik>
    </View>
  )
}

ReminderForm.defaultProps = {

}

ReminderForm.propTypes = {

}

export default ReminderForm
