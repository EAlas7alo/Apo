import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { CLEAR_SELECTED_ENTRIES } from './queries'

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
  const [clearSelectedEntries] = useMutation(CLEAR_SELECTED_ENTRIES)

  const handleMultiSelectClose = () => {
    clearSelectedEntries()
    props.setMultiSelect(false)
  }

  return props.visible && (
    <PopUpMenuView>
      <PopUpButton>
        <Icon name="md-trash" size={40} />
      </PopUpButton>
      <PopUpButton onPress={() => { handleMultiSelectClose() }}>
        <Icon name="md-close" size={40} />
      </PopUpButton>
    </PopUpMenuView>
  )
}

EntryOptionsPopUp.propTypes = {
  visible: PropTypes.bool.isRequired,
  setMultiSelect: PropTypes.func.isRequired,
}

export default EntryOptionsPopUp
