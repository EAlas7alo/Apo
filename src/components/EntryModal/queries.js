import gql from 'graphql-tag'

const GET_CURRENT_FOLDER_ID = gql`
  {
    currentFolder @client {
        id
    }
  }
`

const GET_CURRENT_FOLDER_ENTRIES = gql`
  {
    currentFolder @client {
      entries {
        id
        title
        content
        images
      }
    }
  }
`

const ADD_IMAGE = gql`
  mutation addImage($image: String!) {
    addImage(image: $image) @client
  }
`

export { GET_CURRENT_FOLDER_ID, GET_CURRENT_FOLDER_ENTRIES, ADD_IMAGE }
