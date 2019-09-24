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

export { GET_CURRENT_FOLDER, SET_CURRENT_FOLDER }