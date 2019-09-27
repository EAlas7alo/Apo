import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Modal from 'react-native-modal'
import { Button } from '../StyledComponents'
import { GET_CURRENT_FOLDER } from './queries'

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
    createFolder(name: $name, parentId: $parentId) {
      id
      name
    }
  }
`

const CreateFolderModal = ({ modalVisible, setModalVisible, mainFolder }) => {
  const [folderName, setFolderName] = useState('')
  const [createFolder] = useMutation(CREATE_FOLDER, {
    update(cache, { data: { createFolder } }) {
      const { currentFolder } = cache.readQuery({ query: GET_CURRENT_FOLDER })
      console.log(createFolder)
      cache.writeQuery({
        query: GET_CURRENT_FOLDER,
        data:
          {
            currentFolder: {
              ...currentFolder,
              folders: currentFolder.folders.concat([createFolder]),
              itemOrder: currentFolder.itemOrder.concat(createFolder.id),
            },
          },
      })
    },
  })

  const handleCreateFolder = async () => {
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
  mainFolder: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default CreateFolderModal
