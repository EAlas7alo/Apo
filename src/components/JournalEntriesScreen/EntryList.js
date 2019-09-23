import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TouchableHighlight, BackHandler } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ListItem from './ListItem'
import findImagesByEntry from '../../logic/findImagesByEntry'
import { SET_CURRENT_ENTRY, SET_CURRENT_IMAGES, GET_CURRENT_IMAGES } from '../../queries/queries'
import { ALL_FOLDERS } from '../../queries/Folders'

const SET_CURRENT_FOLDER = gql`
  mutation setCurrentFolder($id: ID) {
    setCurrentFolder(id: $id) @client
  }
`

const GET_CURRENT_FOLDER = gql`
  {
    currentFolder @client {
        id
        isMainFolder
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
  const [folderStack, setFolderStack] = useState([])
  const folders = useQuery(ALL_FOLDERS)
  const { data: { currentFolder }, loading, error, data } = useQuery(GET_CURRENT_FOLDER)
  const [setCurrentFolder] = useMutation(SET_CURRENT_FOLDER)
  const [setCurrentEntry] = useMutation(SET_CURRENT_ENTRY)
  const [setCurrentImages] = useMutation(SET_CURRENT_IMAGES, {
    refetchQueries: GET_CURRENT_IMAGES,
  })

  BackHandler.addEventListener('hardwareBackPress', async () => {
    console.log(currentFolder)
    if (!currentFolder.isMainFolder) {
      const previousFolderId = folderStack[folderStack.length - 1]
      setFolderStack(folderStack.filter(folderId => folderId !== previousFolderId.toString()))
      await setCurrentFolder({ variables: { id: previousFolderId } })
      return true
    }
    return false
  })

  const onPressEntry = async (entry) => {
    const foundFolder = await findImagesByEntry(entry.id)
    await setCurrentEntry({ variables: { entry } })
    await setCurrentImages({ variables: { images: entry.images } })
    navigation.navigate('EntryModal',
      { entry: { images: foundFolder, ...entry } })
  }

  const onPressFolder = async (folder) => {
    setFolderStack(folderStack => [...folderStack, currentFolder.id])
    await setCurrentFolder({ variables: { id: folder.id } })
  }

  const onPressItem = (item) => {
    if (item.__typename === 'Entry') {
      onPressEntry(item)
    } else {
      onPressFolder(item)
    }
  }

  if (loading || !currentFolder) return null

  const arrangeItems = (folder) => {
    const data = currentFolder.entries.concat(currentFolder.folders)
    const sortedItems = data.sort((a, b) => {
      return currentFolder.itemOrder.indexOf(a)
        - currentFolder.itemOrder.indexOf(b)
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
