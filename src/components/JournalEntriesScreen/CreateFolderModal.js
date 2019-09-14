import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { View, TextInput, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modal'
import { Button } from '../StyledComponents'

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

const CreateFolderModal = ({ modalVisible, setModalVisible }) => {
  const [folderName, setFolderName] = useState('')

  return (
    <ModalView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => { setModalVisible(false) }}
      >
        <TextBoxView>
          <ModalText>Create a new folder</ModalText>
          <ModalTextInput value={folderName} onChangeText={(value) => { setFolderName(value) }} />
          <Button>
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
