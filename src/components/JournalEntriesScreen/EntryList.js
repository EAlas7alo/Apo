import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TouchableHighlight, BackHandler } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { withNavigationFocus } from 'react-navigation'
import ListItem from './ListItem'
import findImagesByEntry from '../../logic/findImagesByEntry'
import { SET_CURRENT_ENTRY, SET_CURRENT_IMAGES } from '../../queries/queries'
import { GET_CURRENT_FOLDER, SET_CURRENT_FOLDER, SET_SELECTED_ENTRIES, SET_SELECTED_FOLDERS, GET_SELECTED_ENTRIES, GET_SELECTED_FOLDERS } from './queries'
import EntryOptionsPopUp from './EntryOptionsPopUp'


const EntryList = ({ navigation, fabActive, isFocused }) => {
  const [folderStack, setFolderStack] = useState([])
  const [multiSelect, setMultiSelect] = useState(false)

  const { data: { selectedEntries } } = useQuery(GET_SELECTED_ENTRIES)
  const { data: { selectedFolders } } = useQuery(GET_SELECTED_FOLDERS)
  const { data: { currentFolder }, loading } = useQuery(GET_CURRENT_FOLDER)
  const [setCurrentFolder] = useMutation(SET_CURRENT_FOLDER)
  const [setCurrentEntry] = useMutation(SET_CURRENT_ENTRY)
  const [setCurrentImages] = useMutation(SET_CURRENT_IMAGES)
  const [setSelectedEntries] = useMutation(SET_SELECTED_ENTRIES)
  const [setSelectedFolders] = useMutation(SET_SELECTED_FOLDERS)
  console.log(loading)
  console.log(currentFolder)
  const isMainFolder = loading ? true : currentFolder.isMainFolder

  const handleBackPress = async () => {
    if (loading) return false
    if (!currentFolder.isMainFolder && isFocused && !fabActive) {
      const previousFolderId = folderStack[folderStack.length - 1]
      setFolderStack(folderStack.filter(folderId => folderId !== previousFolderId.toString()))
      await setCurrentFolder({ variables: { id: previousFolderId } })
      return true
    // eslint-disable-next-line no-else-return
    } else if (fabActive) {
      // No behavior for back button when FAB is open
      return true
    }
    BackHandler.exitApp()
    return false
  }

  useEffect(() => {
    if (!isFocused) {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    } else {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    }
  }, [isFocused, loading, isMainFolder, fabActive])


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
      if (item.__typename === 'Entry') {
        setSelectedEntries({ variables: { entry: item.id } })
      } else {
        setSelectedFolders({ variables: { folder: item.id } })
      }
    } else if (item.__typename === 'Entry') {
      onPressEntry(item)
    } else {
      onPressFolder(item)
    }
  }

  const onLongPressItem = (item) => {
    if (!multiSelect) {
      setMultiSelect(true)
      if (item.__typename === 'Entry') {
        setSelectedEntries({ variables: { entry: item.id } })
      } else {
        setSelectedFolders({ variables: { folder: item.id } })
      }
    }
  }

  if (loading || !currentFolder) return null

  const arrangeItems = () => {
    const data = currentFolder.entries.concat(currentFolder.folders)
    const sortedItems = data.sort((a, b) => {
      return currentFolder.itemOrder.indexOf(a)
        - currentFolder.itemOrder.indexOf(b)
    })
    return sortedItems
  }
  const datax = arrangeItems()

  const renderItem = ({ item }) => {
    const isHighlighted = () => {
      if (selectedEntries.includes(item.id) || selectedFolders.includes(item.id)) {
        return true
      }
      return false
    }

    const highlighted = isHighlighted()
    return (
      <TouchableHighlight
        onPress={() => { onPressItem(item) }}
        onLongPress={() => { onLongPressItem(item) }}
        underlayColor="gray"
      >
        <ListItem
          item={item}
          highlighted={highlighted}
        />
      </TouchableHighlight>
    )
  }

  renderItem.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }


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
  isFocused: PropTypes.bool.isRequired,
  fabActive: PropTypes.bool.isRequired,
}


export default withNavigationFocus(EntryList)
