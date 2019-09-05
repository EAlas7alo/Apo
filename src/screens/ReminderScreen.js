import React from 'react';
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { ALL_REMINDERS } from '../queries/queries'
import MyAppText from '../components/TextComponents/MyAppText'


const Header = styled(MyAppText)`
  font-size: 20
`

const ReminderScreen = () => {
  const { data: { allReminders }, loading } = useQuery(ALL_REMINDERS)
  if (loading) return null


  return (
    <View>
      <Header text="Reminders" />
    </View>
  )
}

ReminderScreen.propTypes = {

}

export default ReminderScreen
