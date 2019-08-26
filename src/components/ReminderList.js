import React from 'react'
import { View, FlatList } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { ALL_REMINDERS } from '../queries/queries'


const ReminderHeader = styled.Text`
  font-size: 15
  font-weight: bold
  color: white
  padding-left: 15px
  padding-bottom: 10px
  padding-top: 10px
`

const ReminderView = styled.View`
  padding-left: 15px
  padding-top: 5px
  padding-bottom: 5px
  border-color: black
  border-width: 1px
  background-color: dimgray
`

const ReminderText = styled.Text`
  color: white
`

const ReminderList = () => {
  const { data, loading } = useQuery(ALL_REMINDERS)
  if (loading) return null
  console.log(data)

  return (
    <View style={{ flex: 1 }}>
      <ReminderHeader>Reminders</ReminderHeader>
      <FlatList
        data={data.allReminders}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <ReminderView>
              <ReminderText>{item.content}</ReminderText>
            </ReminderView>
          )
        }}
      />
    </View>
  )
}

export default ReminderList
