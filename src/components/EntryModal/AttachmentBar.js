import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, FlatList } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AttachmentView from './AttachmentView'
import { GET_CURRENT_IMAGES } from '../../queries/queries'
import AttachmentBarOptions from './AttachmentBarOptions';

const GET_SELECTED_IMAGES = gql`
  query getSelectedImages @client {
    selectedImages @client
  }
`
console.log('')
const AttachmentBar = ({ onPress }) => {
  // console.log('id:', id)
  const { data, loading } = useQuery(GET_CURRENT_IMAGES)
  const { data: { selectedImages } } = useQuery(GET_SELECTED_IMAGES)

  console.log('selectedImages:', selectedImages)
  console.log('query data:', data)
  if (loading) return null
  console.log(data)
  const entryImages = data.currentImages

  return (
    <View>
      {entryImages.length > 0
        ? (
          <View>
            <FlatList
              data={entryImages}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <AttachmentView key={item} item={item} onPress={onPress} />
              )}
            />
            <AttachmentBarOptions visible={selectedImages.length > 0} />
          </View>
        )
        : <Text>No attachments</Text> }
    </View>
  )
}

AttachmentBar.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default AttachmentBar
