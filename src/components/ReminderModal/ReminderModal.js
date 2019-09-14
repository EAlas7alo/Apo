import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
      <ReminderForm navigation={navigation} />
    </ReminderView>
  )
}

ReminderModal.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default ReminderModal
