import React, { useState } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import ReminderForm from './ReminderForm';

const ReminderView = styled.View`
  background-color: dimgray
  flex: 1
`

const ReminderModal = ({ navigation }) => {

  return (
    <ReminderView>
      <ReminderForm />
    </ReminderView>
  )
}

export default ReminderModal
