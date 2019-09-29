import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, SectionList, Picker } from 'react-native'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { ALL_REMINDERS, TOGGLE_RESOLVED_STATUS, DELETE_REMINDER, ACTIVE_REMINDERS } from '../queries/queries'
import MyAppText from '../components/TextComponents/MyAppText'
import { Container } from '../components/StyledComponents'
import ListReminder from '../components/ReminderScreen/ListReminder';
import CreateFolderModal from '../components/JournalEntriesScreen/CreateFolderModal';

const Header = styled(MyAppText)`
  font-size: 20
  border-bottom-width: 1px
  border-bottom-color: white
  padding-left: 28px
  padding-top: 5px
`

const ReminderScreenContainer = styled(Container)`
  border-width: 1px
  border-color: white
`

const FilterView = styled.View`
  border-bottom-width: 1px
  border-color: white
`

const ReminderScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('all')
  const { data: { allReminders }, loading } = useQuery(ALL_REMINDERS)
  const [deleteReminder] = useMutation(DELETE_REMINDER, {
    refetchQueries: [{ query: ALL_REMINDERS }, { query: ACTIVE_REMINDERS }],
  })
  const [toggleResolvedStatus] = useMutation(TOGGLE_RESOLVED_STATUS, {
    refetchQueries: [{ query: ALL_REMINDERS }, { query: ACTIVE_REMINDERS }],
  })
  const toggleDrawer = () => {
    navigation.toggleDrawer()
  }

  const toggleReminderStatus = (id) => {
    toggleResolvedStatus({ variables: { id } })
  }

  const handleReminderDelete = (id) => {
    deleteReminder({ variables: { id } })
  }

  useEffect(() => {
    navigation.setParams({ toggleDrawer })
  }, [])

  if (loading) return null

  const expiredReminders = allReminders.filter(reminder => reminder.resolved)
  const activeReminders = allReminders.filter(reminder => {
    if (reminder.resolved) return false
    if (new Date(reminder.dateExpiry) < new Date()) return true
  })
  const activeAndUpcomingReminders = allReminders.filter(reminder => !reminder.resolved)

  const sections = () => {
    if (filter === 'all') {
      return [{ title: 'Active and upcoming', data: activeAndUpcomingReminders },
        { title: 'Resolved', data: expiredReminders }]
    // eslint-disable-next-line no-else-return
    } else if (filter === 'active') {
      return [{ title: 'Active', data: activeReminders }]
    } else if (filter === 'expired') {
      return [{ title: 'Resolved', data: expiredReminders }]
    } else if (filter === 'active_upcoming') {
      return [{ title: 'Active and upcoming', data: activeAndUpcomingReminders }]
    }
    return null
  }

  return (
    <ReminderScreenContainer>
      <FilterView>
        <Picker
          selectedValue={filter}
          style={{ color: 'white' }}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => {
            setFilter(itemValue)
          }}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Active" value="active" />
          <Picker.Item label="Expired" value="expired" />
          <Picker.Item label="Active and upcoming" value="active_upcoming" />
        </Picker>
      </FilterView>
      <SectionList
        keyExtractor={(item, index) => item.id + index}
        sections={sections()}
        renderSectionHeader={({ section: { title } }) => (
          <Header text={title} />
        )}
        renderItem={({ item, index }) => {
          const background = index % 2 > 0 ? 'dimgray' : 'gray'
          return (
            <ListReminder
              background={background}
              item={item}
              statusListener={toggleReminderStatus}
              deleteHandler={handleReminderDelete}
            />
          )
        }}
      />
    </ReminderScreenContainer>
  )
}

ReminderScreen.propTypes = {
  navigation: PropTypes.shape({
    toggleDrawer: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
}

ReminderScreen.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state
  if (!params) {
    return null
  }
  return {
    title: 'Reminders',
    headerLeft: (
      <TouchableOpacity
        style={{ paddingLeft: 20 }}
        onPress={params.toggleDrawer}
      >
        <Icon name="md-menu" size={30} color="white" />
      </TouchableOpacity>
    ),
  }
}

export default ReminderScreen
