import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { CLEAR_SELECTED_ITEMS, GET_SELECTED_ENTRIES, DELETE_MANY_ITEMS, GET_CURRENT_FOLDER, GET_SELECTED_FOLDERS } from './queries'

const PopUpMenuView = styled.View`
  right: 50px
  background-color: white
  position: absolute
  flex-direction: row
  z-index: 1
`

const PopUpButton = styled.TouchableHighlight`
  padding: 5px 10px 0px
`

const EntryOptionsPopUp = (props) => {
  const { data: { selectedEntries } } = useQuery(GET_SELECTED_ENTRIES)
  const { data: { selectedFolders } } = useQuery(GET_SELECTED_FOLDERS)
  const { data: { currentFolder } } = useQuery(GET_CURRENT_FOLDER)
  const [clearSelectedItems] = useMutation(CLEAR_SELECTED_ITEMS)
  const [deleteManyItems] = useMutation(DELETE_MANY_ITEMS, {
    update(cache) {
      const { currentFolder } = cache.readQuery({ query: GET_CURRENT_FOLDER })
      cache.writeQuery({
        query: GET_CURRENT_FOLDER,
        data:
          { currentFolder:
            { ...currentFolder,
              entries: currentFolder.entries.filter(entry => !selectedEntries.includes(entry.id)),
              folders: currentFolder.folders.filter(folder => !selectedFolders.includes(folder.id)),
            },
          },
      })
    },
  })

  const handleMultiSelectClose = () => {
    clearSelectedItems()
    props.setMultiSelect(false)
  }

  const handleDelete = async () => {
    await deleteManyItems({
      variables:
      { entries: selectedEntries || [],
        folder: props.folder,
        folders: selectedFolders || [],
      },
    })
    handleMultiSelectClose()
  }

  return props.visible && (
    <PopUpMenuView>
      <PopUpButton onPress={handleDelete}>
        <Icon name="md-trash" size={40} />
      </PopUpButton>
      <PopUpButton onPress={handleMultiSelectClose}>
        <Icon name="md-close" size={40} />
      </PopUpButton>
    </PopUpMenuView>
  )
}

EntryOptionsPopUp.propTypes = {
  visible: PropTypes.bool.isRequired,
  setMultiSelect: PropTypes.func.isRequired,
  folder: PropTypes.string.isRequired,
}

export default EntryOptionsPopUp
