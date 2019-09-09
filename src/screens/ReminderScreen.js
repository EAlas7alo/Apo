import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, SectionList } from 'react-native'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { ALL_REMINDERS, TOGGLE_RESOLVED_STATUS } from '../queries/queries'
import MyAppText from '../components/TextComponents/MyAppText'
import { Container } from '../components/StyledComponents'
import ListReminder from '../components/ReminderScreen/ListReminder';

const Header = styled(MyAppText)`
  font-size: 20
  border-bottom-width: 1px
  border-bottom-color: white
  padding-left: 28px
  padding-top: 5px
`

const ReminderScreen = ({ navigation }) => {
  const { data: { allReminders }, loading } = useQuery(ALL_REMINDERS)
  const [toggleResolvedStatus] = useMutation(TOGGLE_RESOLVED_STATUS)
  console.log(allReminders)
  const toggleDrawer = () => {
    navigation.toggleDrawer()
  }

  const toggleReminderStatus = (id) => {
    toggleResolvedStatus({ variables: { id } })
  }

  useEffect(() => {
    navigation.setParams({ toggleDrawer })
  }, [])

  if (loading) return null
  console.log(allReminders)
  const expiredReminders = allReminders.filter(reminder => reminder.resolved)
  const activeReminders = allReminders.filter(reminder => !reminder.resolved)

  return (
    <Container>
      <SectionList
        keyExtractor={(item, index) => item.id + index}
        sections={[
          { title: 'Active and upcoming', data: activeReminders },
          { title: 'Resolved', data: expiredReminders },
        ]}
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
            />
          )
        }}
      />
    </Container>
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
