import React from 'react'
import {
  FlatList, StyleSheet, Button, View, Text 
} from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import JournalEntry from '../components/JournalEntry'


const journalEntries = [
  {
    title: 'Read Three-Body Problem',
    content: 'Three-Body Problem by Cixin Liu',
  },
  {
    title: 'Sold Qt for 200 euros',
    content: 'Qt stock sold for 200',
  },
  {
    title: 'React Native best Practices',
    content: 'https://medium.com/react-native-training/best-practices-for-creating-react-native-apps-part-1-66311c746df3'
  },
]

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

const JournalEntriesScreen = (props) => {
  const onPressItem = (name) => {
    alert('hi!')
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
export default JournalEntriesScreen
