import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View, Text, FlatList } from 'react-native'
import AttachmentView from './AttachmentView'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_ENTRY = gql`
  query getEntry($id: String!) {
    getEntry(id: $id) @client {
      images
    }
  }
`

const AttachmentBar = ({ onPress, id }) => {
  console.log('id:', id)
  const { data } = useQuery(GET_ENTRY, { variables: { id } })
  console.log('query data:', data)
  if (!data.getEntry) return null
  const entryImages = data.getEntry.images

  return (
    <View>
      {entryImages.length > 0
        ? (
          <FlatList
            data={entryImages}
            horizontal
            keyExtractor={(item, index) => item}
            renderItem={({ item }) => (
              <AttachmentView id={id} key={item} item={item} onPress={onPress} />
            )}
          />
        )
        : <Text>No attachments</Text> }
    </View>
  )
}

AttachmentBar.defaultProps = {
  images: null,
}

AttachmentBar.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func.isRequired,

}

export default AttachmentBar
