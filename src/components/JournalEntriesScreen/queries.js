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

const CLEAR_SELECTED_ITEMS = gql`
  mutation clearSelectedItems {
    clearSelectedItems @client
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
const GET_SELECTED_FOLDERS = gql`
  {
    selectedFolders @client
  }
`

const SET_SELECTED_FOLDERS = gql`
  mutation setSelectedFolders($folder: String) {
    setSelectedFolders(folder: $folder) @client
  }
`

const DELETE_MANY_ITEMS = gql`
  mutation deleteManyItems($entries: [ID]!, $folder: ID!, $folders: [ID]!) {
    deleteManyFolders(idList: $folders)
    deleteEntries(idList: $entries, folder: $folder)
  }
`

export {
  GET_CURRENT_FOLDER,
  SET_CURRENT_FOLDER,
  GET_SELECTED_ENTRIES,
  SET_SELECTED_ENTRIES,
  CLEAR_SELECTED_ITEMS,
  DELETE_FOLDER,
  DELETE_ENTRIES,
  GET_SELECTED_FOLDERS,
  SET_SELECTED_FOLDERS,
  DELETE_MANY_ITEMS,
}
