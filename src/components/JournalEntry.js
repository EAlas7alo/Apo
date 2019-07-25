import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import MyAppText from './TextComponents/MyAppText'

const styles = StyleSheet.create({
  journalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  journalEntry: {
    color: 'snow',
  },
})

const JournalEntry = ({ title, content, style }) => {
  return (
    <View style={style}>
      <MyAppText style={styles.journalTitle} text={title} />
      <MyAppText style={styles.journalEntry} text={content} />
    </View>
  )
}

JournalEntry.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}
export default JournalEntry
