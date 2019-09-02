import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList, StyleSheet, TouchableHighlight,
} from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { FloatingAction } from 'react-native-floating-action'
import styled from 'styled-components'
import JournalEntry from '../components/JournalEntriesScreen/JournalEntry'
import { ALL_ENTRIES, SET_CURRENT_ENTRY, SET_CURRENT_IMAGES, GET_CURRENT_IMAGES, ALL_REMINDERS } from '../queries/queries';
import { addIcon, filingIcon, reminderIcon } from '../constants/Icons';
import findImagesByEntry from '../logic/findImagesByEntry'
import ReminderList from '../components/JournalEntriesScreen/ReminderList';


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
];

const styles = StyleSheet.create({
  journalEntry: {
    padding: 25,
  },
})

const Container = styled.View`
  flex: 1
  background-color: dimgray
`

const RemindersView = styled.View`
  background-color: gray
  border-color: black
  border-width: 1px
  flex: 1
`

const EntriesView = styled.View`
  flex: 5
`

const JournalEntriesScreen = ({ navigation }) => {
  const journalEntries = useQuery(ALL_ENTRIES)
  const data = journalEntries.data.allEntries
  const reminders = useQuery(ALL_REMINDERS)
  if (!reminders.loading) {
    console.log(reminders.data)
  }

  const [setCurrentEntry] = useMutation(SET_CURRENT_ENTRY)
  const [setCurrentImages] = useMutation(SET_CURRENT_IMAGES, {
    refetchQueries: GET_CURRENT_IMAGES,
  })

  const onPressItem = async (name) => {
    if (name === 'add_entry') {
      await setCurrentImages({ variables: { images: [] } })
      navigation.navigate('EntryModal')
    } else if (name === 'add_reminder') {
      navigation.navigate('ReminderModal')
    }
  }

  const onPressEntry = async (entry) => {
    // console.log(entry)
    const foundFolder = await findImagesByEntry(entry.id)
    console.log('found folder for entry?', foundFolder)
    await setCurrentEntry({ variables: { entry } })
    await setCurrentImages({ variables: { images: entry.images } })
    navigation.navigate('EntryModal',
      { entry: { images: foundFolder, ...entry } })
  }

  return (
    <Container>
      <RemindersView>
        <ReminderList />
      </RemindersView>
      <EntriesView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => { onPressEntry(item) }}
              underlayColor="gray"
            >
              <JournalEntry
                id={item.id.toString()}
                images={item.images}
                style={styles.journalEntry}
                title={item.title}
                content={item.content}
              />
            </TouchableHighlight>
          )}
        />
      </EntriesView>
      <FloatingAction
        color="white"
        floatingIcon={addIcon}
        actions={actions}
        onPressItem={(name) => {
          onPressItem(name)
        }}
      />
    </Container>
  );
};

JournalEntriesScreen.navigationOptions = {
  title: 'Entries',
}

JournalEntriesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default JournalEntriesScreen
