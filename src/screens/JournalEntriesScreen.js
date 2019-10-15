import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { FloatingAction } from 'react-native-floating-action'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Ionicons'
import { SET_CURRENT_IMAGES } from '../queries/queries';
import { addIcon, filingIcon, reminderIcon, folderIcon } from '../constants/Icons';
import ReminderList from '../components/JournalEntriesScreen/ReminderList';
import { Container } from '../components/StyledComponents'
import CreateFolderModal from '../components/JournalEntriesScreen/CreateFolderModal'
import EntryList from '../components/JournalEntriesScreen/EntryList'


const actions = [
  {
    text: 'Add an entry',
    name: 'add_entry',
    position: 1,
    color: 'white',
    icon: filingIcon,
  },
  {
    text: 'Add a reminder',
    name: 'add_reminder',
    position: 2,
    color: 'white',
    icon: reminderIcon,
  },
  {
    text: 'Add a folder',
    name: 'add_folder',
    position: 3,
    color: 'white',
    icon: folderIcon,
  },
]

const RemindersView = styled.View`
  background-color: gray
  border-color: white
  border-width: 1px
  height: 150px
  overflow: hidden
`

const EntriesView = styled.View`
  flex: 6
  border-width: 1px
  border-color: white
`

const JournalEntriesScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [fabActive, setFabActive] = useState(false)
  const [setCurrentImages] = useMutation(SET_CURRENT_IMAGES)

  const onPressItem = async (name) => {
    if (name === 'add_entry') {
      await setCurrentImages({ variables: { images: [] } })
      navigation.navigate('EntryModal')
    } else if (name === 'add_reminder') {
      navigation.navigate('ReminderModal')
    } else if (name === 'add_folder') {
      setModalVisible(true)
    }
    setFabActive(false)
  }

  const toggleDrawer = () => {
    navigation.toggleDrawer()
  }

  useEffect(() => {
    navigation.setParams({ toggleDrawer })
  }, [])

  return (
    <Container>
      <RemindersView>
        <ReminderList />
      </RemindersView>
      <EntriesView>
        <EntryList navigation={navigation} fabActive={fabActive} />
      </EntriesView>
      <FloatingAction
        color="white"
        floatingIcon={addIcon}
        actions={actions}
        onPressItem={(name) => {
          onPressItem(name)
        }}
        onPressMain={() => { setFabActive(!fabActive) }}
      />
      <CreateFolderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Container>
  )
}

JournalEntriesScreen.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state
  if (!params) {
    return null
  }
  return {
    title: 'Entries',
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

JournalEntriesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
}

export default JournalEntriesScreen
