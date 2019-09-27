import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'

const OptionsView = styled.View`
  background-color: snow
  padding: 2px
  justify-content: flex-start
  align-items: center
  margin-top: 5px
  border-radius: 10
`

const DeleteButton = styled.TouchableHighlight`
  border-width: 1px
  border-color: white
  background-color: red
  border-radius: 10
  padding: 5px 5px 5px 5px
`

const OptionsText = styled.Text`
  color: white
  font-size: 20
`

const AttachmentBarOptions = ({ visible }) => {
  const [deleteSelectedImages] = useMutation(
    gql`
      mutation deleteSelectedImages {
        deleteSelectedImages @client
      }
    `,
  )

  const onDeletePress = () => {
    deleteSelectedImages()
  }

  return (
    <OptionsView>
      {visible && (
      <DeleteButton onPress={onDeletePress}>
        <OptionsText>Delete selected</OptionsText>
      </DeleteButton>
      )}
    </OptionsView>
  )
}

AttachmentBarOptions.propTypes = {
  visible: PropTypes.bool.isRequired,
}

export default AttachmentBarOptions
