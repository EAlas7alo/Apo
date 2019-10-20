import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TouchableHighlight, BackHandler } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { withNavigationFocus } from 'react-navigation'
import Modal from 'react-native-modal'
import styled from 'styled-components'
import ListItem from './ListItem'
import findImagesByEntry from '../../logic/findImagesByEntry'
import { SET_CURRENT_ENTRY, SET_CURRENT_IMAGES } from '../../queries/queries'
import { GET_CURRENT_FOLDER, SET_CURRENT_FOLDER, SET_SELECTED_ENTRIES, SET_SELECTED_FOLDERS, GET_SELECTED_ENTRIES, GET_SELECTED_FOLDERS } from './queries'
import EntryOptionsPopUp from './EntryOptionsPopUp'

const ModalText = styled.Text`
  color: black
  align-self: center
  padding: 5px
  font-size: 20
`

const SmallModalText = styled(ModalText)`
  font-size: 15
`

const NewUserModal = styled(Modal)`
  margin: 300px 120px 350px
  
`

const ModalView = styled.TouchableOpacity`
  background-color: snow
  flex: 1
`

const EntryList = ({ navigation, fabActive, isFocused }) => {
  const [folderStack, setFolderStack] = useState([])
  const [multiSelect, setMultiSelect] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const { data: { selectedEntries } } = useQuery(GET_SELECTED_ENTRIES)
  const { data: { selectedFolders } } = useQuery(GET_SELECTED_FOLDERS)
  const { data: { currentFolder }, loading } = useQuery(GET_CURRENT_FOLDER)
  const [setCurrentFolder] = useMutation(SET_CURRENT_FOLDER)
  const [setCurrentEntry] = useMutation(SET_CURRENT_ENTRY)
  const [setCurrentImages] = useMutation(SET_CURRENT_IMAGES)
  const [setSelectedEntries] = useMutation(SET_SELECTED_ENTRIES)
  const [setSelectedFolders] = useMutation(SET_SELECTED_FOLDERS)

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
      // No behavior for the back button when FAB is open
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
  }, [isFocused, loading, isMainFolder, fabActive, folderStack])

  useEffect(() => {
    if (!loading
        && currentFolder.entries.length === 0
        && currentFolder.folders.length === 0) {
      setModalVisible(true)
    }
  }, [loading])

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
  if (loading) return null
  const arrangeItems = () => {
    if (!currentFolder) return []
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
      <NewUserModal
        isVisible={modalVisible}
        onBackdropPress={() => { setModalVisible(false) }}
        backdropTransitionOutTiming={0}
      >
        <ModalView onPress={() => { setModalVisible(false) }}>
          <ModalText>
            You seem to have no entries!
            You can start by clicking the + button in the lower right corner!
            {'\n'}
            {'\n'}
            {'\n'}
          </ModalText>
          <SmallModalText>
            Press anywhere to close this message
          </SmallModalText>
        </ModalView>
      </NewUserModal>
      <EntryOptionsPopUp
        visible={multiSelect}
        setMultiSelect={setMultiSelect}
        folder={currentFolder.id}
      />
      <FlatList
        data={datax}
        // eslint-disable-next-line react/prop-types
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
