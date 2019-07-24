import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  FlatList, StyleSheet, Button, View, TouchableHighlight,
} from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import JournalEntry from '../components/JournalEntry'

const actions = [
  {
    text: 'Add an entry',
    name: 'add_entry',
    position: 1,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  journalEntry: {
    padding: 25,
  },
})

const JournalEntriesScreen = ({ journalEntries, navigation }) => {
  console.log(journalEntries)
  const onPressItem = (name) => {
    navigation.navigate('AddEntryScreen')
  }

  const onPressEntry = (id) => {
    console.log(id)
    navigation.navigate('EntryScreen', { id })
  }

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={journalEntries}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => { onPressEntry(item.id) }}
              underlayColor="gray"
            >
              <JournalEntry
                style={styles.journalEntry}
                title={item.title}
                content={item.content}
              />
            </TouchableHighlight>
          )}
        />
      </View>
      <FloatingAction
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
  journalEntries: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = state => {
  return {
    journalEntries: state.journalEntryReducer,
  }
}

export default connect(mapStateToProps, null)(JournalEntriesScreen)
