import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MyAppText from '../TextComponents/MyAppText'
import { Button, ButtonText } from '../StyledComponents'

const ReminderText = styled(MyAppText)`
  padding-left: 20px
  font-size: 30 
`

const ReminderOpacity = styled.TouchableOpacity`
  background-color: ${props => props.background}
`

const ReminderView = styled.View`
  flex-direction: row
`

const DateText = styled(MyAppText)`
  padding-right: 10px
  padding-left: 15px
  margin-left: ${props => ((props.buttonsVisible && '0')
    || (!props.buttonsVisible && 'auto'))}
`

const ReminderContentView = styled.View`
  flex-direction: row
  justify-content: center
  margin-left: auto
  flex: 1
`
const ButtonsView = styled.View`
  margin-left: auto
  padding-right: 20px
`

const ListReminderButton = styled(Button)`
  flex: 1
`

const AlwaysVisibleView = styled.View`
  flex-direction: ${props => ((props.buttonsVisible && 'column')
    || (!props.buttonsVisible && 'row'))}
  flex: 1
`

const ListReminder = ({ background, item, statusListener, deleteHandler }) => {
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const resolvedText = item.resolved ? 'Mark as unresolved' : 'Mark as resolved'

  const handleReminderPress = () => {
    setButtonsVisible(!buttonsVisible)
  }

  return (
    <ReminderOpacity
      background={background}
      onPress={handleReminderPress}
    >
      <ReminderView>
        <AlwaysVisibleView buttonsVisible={buttonsVisible}>
          <ReminderText text={item.content} />
          <DateText buttonsVisible={buttonsVisible} text={`${new Date(item.dateExpiry).toUTCString()}`} />
        </AlwaysVisibleView>

        {buttonsVisible && (
          <ReminderContentView>
            <ButtonsView>
              <ListReminderButton onPress={() => { statusListener(item.id) }}>
                <ButtonText>{resolvedText}</ButtonText>
              </ListReminderButton>
              <ListReminderButton onPress={() => { deleteHandler(item.id) }}>
                <ButtonText>Delete reminder</ButtonText>
              </ListReminderButton>
            </ButtonsView>
          </ReminderContentView>
        )}
      </ReminderView>
    </ReminderOpacity>
  )
}

ListReminder.propTypes = {
  background: PropTypes.string.isRequired,
  item: PropTypes.shape({
    content: PropTypes.string.isRequired,
    dateExpiry: PropTypes.string.isRequired,
    resolved: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  statusListener: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
}

export default ListReminder
