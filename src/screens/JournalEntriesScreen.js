import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  FlatList, StyleSheet, View, TouchableHighlight,
} from 'react-native'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import { FloatingAction } from 'react-native-floating-action'
import JournalEntry from '../components/JournalEntry'
import { setJournalEntries } from '../actions/journalEntryActions'
import { ALL_ENTRIES } from '../queries/queries';
import { addIcon, filingIcon } from '../constants/Icons';
import findImagesByEntry from '../logic/findImagesByEntry'


const actions = [
  {
    text: 'Add an entry',
    name: 'add_entry',
    position: 1,
    color: 'white',
    icon: filingIcon,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dimgray',
  },
  journalEntry: {
    padding: 25,
  },
})

const JournalEntriesScreen = ({ navigation }) => {
  const journalEntries = useQuery(ALL_ENTRIES)
  const data = journalEntries.data.allEntries
  console.log(data)
  const onPressItem = (name) => {
    navigation.navigate('AddEntryScreen')
  }

  const onPressEntry = async (entry) => {
    console.log(entry)
    const foundFolder = await findImagesByEntry(entry.id)
    console.log('found folder for entry?', foundFolder)
    navigation.navigate('EntryScreen', { entry })
  }

  const findImages = async (id) => {
    const images = await findImagesByEntry(id)
    console.log('id:', id)
    console.log('images:', images)
    return images
  }

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => { onPressEntry(item) }}
              underlayColor="gray"
            >
              <JournalEntry
                id={item.id}
                style={styles.journalEntry}
                title={item.title}
                content={item.content}
              />
            </TouchableHighlight>
          )}
        />
      </View>
      <FloatingAction
        color="white"
        floatingIcon={addIcon}
        actions={actions}
        onPressItem={(name) => {
          onPressItem(name)
        }}
      />
    </View>
  );
};

JournalEntriesScreen.navigationOptions = screenProps => ({
  title: 'Entries',
})

JournalEntriesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}


const mapDispatchToProps = {
  setJournalEntries,
}

export default connect(null, mapDispatchToProps)(JournalEntriesScreen)
