import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import MyAppText from './TextComponents/MyAppText'
import ImageList from './ImageList';


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

const JournalEntry = ({ title, content, style, images, id }) => {
  
  return (
    <View style={style}>
      <View style={{ paddingBottom: 20 }}>
        <MyAppText style={styles.journalTitle} text={title} />
        <MyAppText style={styles.journalEntry} text={content} />
      </View>
      <View>
        <ImageList id={id} images={images} />
      </View>
    </View>
  )
}

JournalEntry.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}
export default JournalEntry
