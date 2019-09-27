import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { CLEAR_SELECTED_ENTRIES, DELETE_FOLDER, GET_SELECTED_ENTRIES, DELETE_ENTRIES, GET_CURRENT_FOLDER } from './queries'

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
  const { data: { currentFolder } } = useQuery(GET_CURRENT_FOLDER)
  const [clearSelectedEntries] = useMutation(CLEAR_SELECTED_ENTRIES)
  const [deleteFolder] = useMutation(DELETE_FOLDER)
  const [deleteEntries] = useMutation(DELETE_ENTRIES, {
    refetchQueries: [{ query: GET_CURRENT_FOLDER }],
  })

  const handleMultiSelectClose = () => {
    clearSelectedEntries()
    props.setMultiSelect(false)
  }

  const handleDelete = async () => {
    deleteEntries({ variables: { idList: selectedEntries, folder: props.folder } })
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
