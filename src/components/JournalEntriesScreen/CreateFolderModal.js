import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { View, TextInput, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modal'
import { Button } from '../StyledComponents'
import { GET_MAIN_FOLDER } from '../../queries/Folders'

const ModalView = styled.View`

`

const TextBoxView = styled.View`
  padding: 20px
  justify-content: center
  border-width: 1px
  border-color: white
  background-color: black
`

const ModalText = styled.Text`
  color: white
`

const ModalTextInput = styled.TextInput`
  color: white
  border-width: 1px
  border-color: white
  padding-left: 10px
`

const CREATE_FOLDER = gql`
  mutation createFolder($name: String!, $parentId: ID!) {
    createFolder(name: $name, parentId: $parentId)
  }
`

const CreateFolderModal = ({ modalVisible, setModalVisible, mainFolder }) => {
  const [folderName, setFolderName] = useState('')
  const [createFolder] = useMutation(CREATE_FOLDER)
  
  //console.log(mainFolder, ' xd')

  const handleCreateFolder = async () => {
    console.log('id given to createFolder: ', mainFolder.id)
    console.log(mainFolder)
    await createFolder({ variables: { name: folderName, parentId: mainFolder.id } })
    setFolderName('')
    setModalVisible(false)
  }

  return (
    <ModalView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => { setModalVisible(false) }}
      >
        <TextBoxView>
          <ModalText>Create a new folder</ModalText>
          <ModalTextInput value={folderName} onChangeText={(value) => { setFolderName(value) }} />
          <Button onPress={handleCreateFolder}>
            <ModalText>Create a new folder</ModalText>
          </Button>
        </TextBoxView>
      </Modal>
    </ModalView>
  )
}

CreateFolderModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
}

export default CreateFolderModal
