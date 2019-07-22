import React from 'react';
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  journalEntry: {

  },
  journalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const JournalEntry = ({ title, url, content }) => {
  return (
    <>
      <Text style={styles.journalTitle}>{title}</Text>
      <Text style={styles.journalEntry}>{content}</Text>
    </>
  )
}
JournalEntry.defaultProps = {
  url: null,
}

JournalEntry.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string,

}
export default JournalEntry
