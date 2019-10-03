import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, FlatList } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import AttachmentView from './AttachmentView'
import { GET_CURRENT_IMAGES } from '../../queries/queries'
import AttachmentBarOptions from './AttachmentBarOptions';

const GET_SELECTED_IMAGES = gql`
  query getSelectedImages @client {
    selectedImages @client
  }
`
const ImagesView = styled.View`

`

const AttachmentBar = ({ onPress }) => {
  const { data: { currentImages }, loading } = useQuery(GET_CURRENT_IMAGES)
  const { data: { selectedImages } } = useQuery(GET_SELECTED_IMAGES)

  if (loading) return null

  return (
    <View>
      {currentImages.length > 0
        ? (
          <ImagesView>
            <FlatList
              data={currentImages}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <AttachmentView key={item} item={item} onPress={onPress} />
              )}
            />
            <AttachmentBarOptions visible={selectedImages.length > 0} />
          </ImagesView>
        )
        : <Text>No attachments</Text> }
    </View>
  )
}

AttachmentBar.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default AttachmentBar
