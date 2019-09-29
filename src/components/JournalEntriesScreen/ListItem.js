import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import JournalEntry from './JournalEntry'
import Folder from './Folder'

const ListItemView = styled.View`
  background-color: ${props => props.bgColor}
`

const ListItem = (props) => {
  const { item, highlighted } = props

  const bgColor = highlighted ? 'darkgray' : 'dimgray'

  return (
    <ListItemView bgColor={bgColor}>
      {item.__typename === 'Folder' && (
        <Folder
          item={item}
        />
      )}
      {item.__typename === 'Entry' && (
        <JournalEntry
          id={item.id.toString()}
          images={item.images}
          title={item.title}
          content={item.content}
        />
      )}
    </ListItemView>
  )
}

ListItem.defaultProps = {

}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    content: PropTypes.string,
    __typename: PropTypes.string.isRequired,
  }).isRequired,
  highlighted: PropTypes.bool.isRequired,
}

export default ListItem
