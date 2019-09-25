import gql from 'graphql-tag'

const GET_CURRENT_FOLDER = gql`
  {
    currentFolder @client {
        id
        isMainFolder
        entries {
          title
          content
          images
          id
        }
        folders {
          name
          id
        }
        itemOrder
      }
  }
`

const SET_CURRENT_FOLDER = gql`
  mutation setCurrentFolder($id: ID) {
    setCurrentFolder(id: $id) @client
  }
`

const GET_SELECTED_ENTRIES = gql`
  {
    selectedEntries @client
  }
`

const SET_SELECTED_ENTRIES = gql`
  mutation setSelectedEntries($entry: String) {
    setSelectedEntries(entry: $entry) @client
  }
`

const CLEAR_SELECTED_ENTRIES = gql`
  mutation clearSelectedEntries {
    clearSelectedEntries @client
  }
`

export {
  GET_CURRENT_FOLDER,
  SET_CURRENT_FOLDER,
  GET_SELECTED_ENTRIES,
  SET_SELECTED_ENTRIES,
  CLEAR_SELECTED_ENTRIES,
}
