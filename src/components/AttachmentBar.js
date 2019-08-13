import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View, Text, FlatList } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AttachmentView from './AttachmentView'
import { GET_CURRENT_IMAGES } from '../queries/queries'

const AttachmentBar = ({ onPress }) => {
  // console.log('id:', id)
  const { data, loading } = useQuery(GET_CURRENT_IMAGES)
  console.log('query data:', data)
  if (loading) return null
  console.log(data)
  const entryImages = data.currentImages

  return (
    <View>
      {entryImages.length > 0
        ? (
          <FlatList
            data={entryImages}
            horizontal
            keyExtractor={(item, index) => item}
            renderItem={({ item }) => (
              <AttachmentView key={item} item={item} onPress={onPress} />
            )}
          />
        )
        : <Text>No attachments</Text> }
    </View>
  )
}

AttachmentBar.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default AttachmentBar
