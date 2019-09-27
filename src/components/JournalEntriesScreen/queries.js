import gql from 'graphql-tag'

const GET_CURRENT_FOLDER = gql`
  {
    currentFolder @client {
        id
        isMainFolder
        itemOrder
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

const DELETE_FOLDER = gql`
  mutation deleteFolder($id: ID!) {
    deleteFolder(id: $id)
  }
`

const DELETE_ENTRIES = gql`
  mutation deleteEntries($idList: [ID]!) {
    deleteEntries(idList: $idList)
  }
`

export {
  GET_CURRENT_FOLDER,
  SET_CURRENT_FOLDER,
  GET_SELECTED_ENTRIES,
  SET_SELECTED_ENTRIES,
  CLEAR_SELECTED_ENTRIES,
  DELETE_FOLDER,
  DELETE_ENTRIES,
}
