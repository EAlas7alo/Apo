import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { BackHandler } from 'react-native'
import styled from 'styled-components'
import { withNavigationFocus } from 'react-navigation'
import ReminderForm from './ReminderForm';


const ReminderView = styled.View`
  background-color: dimgray
  flex: 1
`

const ReminderModal = ({ navigation, isFocused }) => {
  const handleBackPress = () => {
    navigation.goBack()
    return true
  }

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    } else {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    }
  }, [isFocused])

  return (
    <ReminderView>
      <ReminderForm navigation={navigation} />
    </ReminderView>
  )
}

ReminderModal.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
}

export default withNavigationFocus(ReminderModal)
