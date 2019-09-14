import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View } from 'react-native'
import MyAppText from '../TextComponents/MyAppText'
import ImageList from './ImageList';

const JournalEntryView = styled.View`
  padding: 25px
`

const JournalTitle = styled(MyAppText)`
  font-size: 20
  font-weight: bold
  color: white
`

const JournalEntryText = styled(MyAppText)`
  color: snow
`

const JournalEntry = ({ title, content, images, id }) => {
  return (
    <JournalEntryView>
      <View style={{ paddingBottom: 20 }}>
        <JournalTitle text={title} />
        <JournalEntryText text={content} />
      </View>
      <View>
        <ImageList id={id} images={images} />
      </View>
    </JournalEntryView>
  )
}

JournalEntry.defaultProps = {
  images: [],
}

JournalEntry.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
}
export default JournalEntry
