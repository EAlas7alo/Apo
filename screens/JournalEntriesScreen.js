import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  FlatList, StyleSheet, Button, View, Text 
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
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 15,
  },
})

const JournalEntriesScreen = ({ journalEntries, navigation }) => {
  console.log(journalEntries)
  const onPressItem = (name) => {
    navigation.navigate('AddEntryScreen')
  }

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          style={styles.journalEntry}
          data={journalEntries}
          keyExtractor={(item, index) => item.title}
          renderItem={({ item }) => (
            <JournalEntry
              title={item.title}
              content={item.content}
            />
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
  headerRight: (
    <Button
      onPress={() => alert('Hello!')}
      title="Tap me!"
      color="black"
    />
  ),
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
