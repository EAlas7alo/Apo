import React, { useState } from 'react'
import { View, Text } from 'react-native'
import ReminderForm from './ReminderForm';

const ReminderModal = ({ navigation }) => {
  const [reminderTitle, setReminderTitle] = useState('')
  return (
    <View>
      <ReminderForm />
    </View>
  )
}

export default ReminderModal
