import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TouchableHighlight } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ListItem from './ListItem'
import findImagesByEntry from '../../logic/findImagesByEntry'
import { ALL_ENTRIES, SET_CURRENT_ENTRY, SET_CURRENT_IMAGES, GET_CURRENT_IMAGES } from '../../queries/queries'
import { GET_MAIN_FOLDER } from '../../queries/Folders'

const SET_CURRENT_FOLDER = gql`
  mutation setCurrentFolder($id: ID) {
    setCurrentFolder(id: $id) @client
  }
`

const GET_CURRENT_FOLDER = gql`
  {
    getCurrentFolder @client {
        id
        entries {
          title
          content
          images
          id
        }
        folders {
          name
          id
        }
        itemOrder
      }
  }
`

const EntryList = ({ navigation }) => {
  const journalEntries = useQuery(ALL_ENTRIES)
  const entries = journalEntries.data.allEntries
  const { data: { getCurrentFolder }, loading, error, data } = useQuery(GET_CURRENT_FOLDER)
  const [setCurrentFolder] = useMutation(SET_CURRENT_FOLDER)
  const [setCurrentEntry] = useMutation(SET_CURRENT_ENTRY)
  const [setCurrentImages] = useMutation(SET_CURRENT_IMAGES, {
    refetchQueries: GET_CURRENT_IMAGES,
  })

  const onPressEntry = async (entry) => {
    const foundFolder = await findImagesByEntry(entry.id)
    await setCurrentEntry({ variables: { entry } })
    await setCurrentImages({ variables: { images: entry.images } })
    navigation.navigate('EntryModal',
      { entry: { images: foundFolder, ...entry } })
  }

  const onPressFolder = async (folder) => {

  }

  const onPressItem = (item) => {
    if (item.__typename === 'Entry') {
      onPressEntry(item)
    } else {
      onPressFolder(item)
    }
  }
  console.log(getCurrentFolder)
  console.log(data)
  if (loading || !getCurrentFolder) return null
  console.log('getCurrentFolder:', getCurrentFolder)
  const arrangeItems = (folder) => {
    const data = getCurrentFolder.entries.concat(getCurrentFolder.folders)
    const sortedItems = data.sort((a, b) => {
      return getCurrentFolder.itemOrder.indexOf(a)
        - getCurrentFolder.itemOrder.indexOf(b)
    })
    //console.log(sortedItems)
    return sortedItems
  }
  const datax = arrangeItems()
  // console.log(data)
  return (
    <View>
      <FlatList
        data={datax}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => { onPressItem(item) }}
            underlayColor="gray"
          >
            <ListItem
              item={item}
            />
          </TouchableHighlight>
        )}
      />
    </View>
  )
}

EntryList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default EntryList
