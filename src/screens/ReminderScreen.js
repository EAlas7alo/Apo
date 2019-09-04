import React from 'react';
import { View } from 'react-native'
import styled from 'styled-components'
import MyAppText from '../components/TextComponents/MyAppText'


const Header = styled(MyAppText)`
  font-size: 20
`

const ReminderScreen = () => {
  return (
    <View>
      <Header text="Reminders" />
    </View>
  )
}

export default ReminderScreen
