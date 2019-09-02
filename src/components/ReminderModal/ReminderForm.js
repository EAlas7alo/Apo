import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, DatePickerAndroid, TimePickerAndroid, Image } from 'react-native'
import { Formik } from 'formik'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import TextInputNamed from '../TextComponents/TextInputNamed';
import { calendarIcon } from '../../constants/Icons'
import MyAppText from '../TextComponents/MyAppText'
import { CREATE_REMINDER, ALL_REMINDERS } from '../../queries/queries'


const DateButton = styled.TouchableHighlight`

`

const ReminderTitleInput = styled(TextInputNamed)`
  border-color: white
  border-width: 1px
  margin-top: 10px
  padding-top: 5px
  padding-bottom: 5px
  border-radius: 10
`
const DateText = styled(MyAppText)`
  border-color: white
  border-width: 1px
  padding: 5px
`

const OptionsHeader = styled(MyAppText)`
  font-size: 20
`

const DateSelectionView = styled.View`
  flex-direction: row
  padding: 10px
  align-items: center
  justify-content: center
`

const OptionsView = styled.View`
  border-color: white
  border-width: 1px
  padding: 5px
  border-radius: 10
`
const SaveButton = styled.TouchableHighlight`
  flex-direction: row
  justify-content: center
  padding: 5px
  margin-top: 20px
  border-radius: 10
`

const SaveText = styled(MyAppText)`
  justify-content: center
  align-items: center
  font-size: 20
  border-radius: 10
  border-color: white
  border-width: 2px
  padding: 5px
`

const ReminderForm = (props) => {
  const [reminderTitle, setReminderTitle] = useState('')
  const [date, setDate] = useState(new Date())

  const [createReminder] = useMutation(CREATE_REMINDER, {
    refetchQueries: [{ query: ALL_REMINDERS }],
  })

  const handleTitleChange = (name, text) => {
    setReminderTitle(text)
    console.log('set textinput value to', text)
  }

  const handleDateChange = async () => {
    try {
      const { action: dateAction, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
      })

      const { action: timeAction, hour, minute } = await TimePickerAndroid.open({
        hour: 0,
        minute: 0,
        is24Hour: true, // Will display '2 PM'
      })

      if (dateAction !== DatePickerAndroid.dismissedAction &&
          timeAction !== TimePickerAndroid.dismissedAction) {
        setDate(new Date(year, month, day, hour, minute))
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  const handleReminderCreation = async () => {
    await createReminder({ variables:
        { content: reminderTitle, dateExpiry: date } })
  }

  return (
    <View>
      <Formik
        initialValues={{ reminderTitle: '' }}
      >
        <View>
          <ReminderTitleInput
            placeholder="Enter a reminder title"
            placeholderTextColor="lightgrey"
            name="reminderTitle"
            value={reminderTitle}
            onChange={handleTitleChange}
          />
          <DateSelectionView>
            <DateButton
              onPress={handleDateChange}
            >
              {calendarIcon}
            </DateButton>
            <DateText text={date.toString()} />
          </DateSelectionView>

          <OptionsView>
            <OptionsHeader text="Options" />
          </OptionsView>

          <SaveButton
            onPress={handleReminderCreation}
          >
            <SaveText text="Save" />
          </SaveButton>
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
