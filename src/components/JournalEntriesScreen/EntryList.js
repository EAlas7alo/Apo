import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TouchableHighlight, BackHandler } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import ListItem from './ListItem'
import findImagesByEntry from '../../logic/findImagesByEntry'
import { SET_CURRENT_ENTRY, SET_CURRENT_IMAGES, GET_CURRENT_IMAGES } from '../../queries/queries'
import { GET_CURRENT_FOLDER, SET_CURRENT_FOLDER, GET_SELECTED_ENTRIES, SET_SELECTED_ENTRIES } from './queries'
import EntryOptionsPopUp from './EntryOptionsPopUp'

const EntryList = ({ navigation }) => {
  const [folderStack, setFolderStack] = useState([])
  const [multiSelect, setMultiSelect] = useState(false)
  const { data: { selectedEntries } } = useQuery(GET_SELECTED_ENTRIES)
  const { data: { currentFolder }, loading } = useQuery(GET_CURRENT_FOLDER)
  const [setCurrentFolder] = useMutation(SET_CURRENT_FOLDER)
  const [setCurrentEntry] = useMutation(SET_CURRENT_ENTRY)
  const [setCurrentImages] = useMutation(SET_CURRENT_IMAGES)
  const [setSelectedEntries] = useMutation(SET_SELECTED_ENTRIES)

  BackHandler.addEventListener('hardwareBackPress', async () => {
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
    if (multiSelect) {
      setSelectedEntries({ variables: { entry: item.id } })
    } else if (item.__typename === 'Entry') {
      onPressEntry(item)
    } else {
      onPressFolder(item)
    }
  }

  const onLongPressItem = (item) => {
    if (!multiSelect) {
      setMultiSelect(true)
      setSelectedEntries({ variables: { entry: item.id } })
    }
  }

  if (loading || !currentFolder) return null

  const arrangeItems = () => {
    const data = currentFolder.entries.concat(currentFolder.folders)
    const sortedItems = data.sort((a, b) => {
      return currentFolder.itemOrder.indexOf(a)
        - currentFolder.itemOrder.indexOf(b)
    })
    // console.log(sortedItems)
    return sortedItems
  }
  const datax = arrangeItems()
  // console.log(data)

  const renderItem = ({ item }) => (
    <TouchableHighlight
      onPress={() => { onPressItem(item) }}
      onLongPress={() => { onLongPressItem(item) }}
      underlayColor="gray"
    >
      <ListItem
        item={item}
        highlighted={selectedEntries.includes(item.id)}
      />
    </TouchableHighlight>
  )

  return (
    <View>
      <EntryOptionsPopUp
        visible={multiSelect}
        setMultiSelect={setMultiSelect}
        folder={currentFolder.id}
      />
      <FlatList
        data={datax}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
