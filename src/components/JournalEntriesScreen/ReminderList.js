import React from 'react'
import { View, FlatList } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Button, ButtonText } from '../StyledComponents'
import { ACTIVE_REMINDERS, TOGGLE_RESOLVED_STATUS, ALL_REMINDERS } from '../../queries/queries'


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
  margin-bottom: auto
  border-color: black
  border-width: 1px
  background-color: ${props => props.background}
  flex-direction: row
`

const ReminderText = styled.Text`
  color: white
  font-size: 20
`

const ReminderList = () => {
  const { data, loading } = useQuery(ACTIVE_REMINDERS)
  const [markAsResolved] = useMutation(TOGGLE_RESOLVED_STATUS, {
    refetchQueries: [{ query: ACTIVE_REMINDERS }, { query: ALL_REMINDERS }],
  })
  if (loading) return null

  const handleMarkAsResolved = async (id) => {
    markAsResolved({ variables: { id } })
  }

  return (
    <View>
      <ReminderHeader>Reminders</ReminderHeader>
      <FlatList
        data={data.activeReminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const background = index % 2 > 0 ? 'gray' : 'dimgray'
          return (
            <ReminderView background={background}>
              <ReminderText>{item.content}</ReminderText>
              <Button
                onPress={() => { handleMarkAsResolved(item.id) }}
              >
                <ButtonText>Mark as resolved</ButtonText>
              </Button>
            </ReminderView>
          )
        }}
      />
    </View>
  )
}

export default ReminderList
