import React from 'react'
import { View, FlatList } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import { ACTIVE_REMINDERS, MARK_REMINDER_AS_RESOLVED } from '../../queries/queries'


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
  background-color: dimgray
  flex-direction: row
`

const ReminderText = styled.Text`
  color: white
  font-size: 20
`

const ResolvedText = styled(ReminderText)`
  font-size: 15
  padding-left: 15px
  padding-right: 15px
`

const ResolvedButton = styled.TouchableHighlight`
  border-width: 1px
  border-color: white
  margin-right: 15px
  margin-left: auto
`

const ReminderList = () => {
  const { data, loading } = useQuery(ACTIVE_REMINDERS)
  const [markAsResolved] = useMutation(MARK_REMINDER_AS_RESOLVED, {
    refetchQueries: [{ query: ACTIVE_REMINDERS }],
  })
  if (loading) return null

  const handleMarkAsResolved = async (id) => {
    console.log(id)
    markAsResolved({ variables: { id } })
  }

  return (
    <View>
      <ReminderHeader>Reminders</ReminderHeader>
      <FlatList
        data={data.activeReminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <ReminderView>
              <ReminderText>{item.content}</ReminderText>
              <ResolvedButton
                onPress={() => { handleMarkAsResolved(item.id) }}
              >
                <ResolvedText>Mark as resolved</ResolvedText>
              </ResolvedButton>
            </ReminderView>
          )
        }}
      />
    </View>
  )
}

export default ReminderList
