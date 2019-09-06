import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, SectionList, View, Text } from 'react-native'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { ALL_REMINDERS } from '../queries/queries'
import MyAppText from '../components/TextComponents/MyAppText'
import { Container, Button, ButtonText } from '../components/StyledComponents'

const Header = styled(MyAppText)`
  font-size: 20
  border-bottom-width: 1px
  border-bottom-color: white
  padding-left: 25px
  padding-top: 5px
`

const ReminderText = styled(MyAppText)`
  padding-left: 20px
  font-size: 30
  
`

const ReminderOpacity = styled.TouchableOpacity`
  background-color: ${props => props.background}
`

const ReminderView = styled.View`

`

const DateText = styled(MyAppText)`
  padding-left: 10px
`

const ReminderContentView = styled.View`
  flex-direction: row
  justify-content: center
`
const ButtonsView = styled.View`
  margin-left: auto
  padding-right: 20px
`

const ReminderScreen = ({ navigation }) => {
  const { data: { allReminders }, loading } = useQuery(ALL_REMINDERS)

  const toggleDrawer = () => {
    navigation.toggleDrawer()
  }

  useEffect(() => {
    navigation.setParams({ toggleDrawer })
  }, [])

  if (loading) return null
  console.log(allReminders)
  const expiredReminders = allReminders.filter(reminder => reminder.resolved)
  const activeReminders = allReminders.filter(reminder => !reminder.resolved)

  const handleReminderPress = () => {

  }

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
            <ReminderOpacity background={background}>
              <ReminderView>
                <ReminderText text={item.content} />
                <ReminderContentView>
                  <DateText text={`Expiration: ${new Date(item.dateExpiry).toUTCString()}`} />
                  <ButtonsView>
                    <Button>
                      <ButtonText>xd</ButtonText>
                    </Button>
                    <Button>
                      <ButtonText>dx</ButtonText>
                    </Button>
                  </ButtonsView>
                </ReminderContentView>
              </ReminderView>
            </ReminderOpacity>
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
