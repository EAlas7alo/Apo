import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
  },
  content: {
    fontSize: 15,
  },
})

const EntryScreen = ({ navigation, entries }) => {
  // eslint-disable-next-line no-console
  console.log(entries)
  const id = navigation.getParam('id', 0)
  const entry = entries.find(entry => entry.id === id)
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{entry.title}</Text>
      </View>
      <Text style={styles.content}>{entry.content}</Text>
    </View>
  );
};


EntryScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = state => {
  return {
    entries: state.journalEntryReducer,
  }
}

export default connect(mapStateToProps, null)(EntryScreen)
