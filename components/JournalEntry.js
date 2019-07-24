import React from 'react';
import PropTypes from 'prop-types'
import { Text, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  journalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const JournalEntry = ({ title, content, style }) => {
  return (
    <View style={style}>
      <Text style={styles.journalTitle}>{title}</Text>
      <Text style={styles.journalEntry}>{content}</Text>
    </View>
  )
}

JournalEntry.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}
export default JournalEntry
