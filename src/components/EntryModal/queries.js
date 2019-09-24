import gql from 'graphql-tag'

const GET_CURRENT_FOLDER_ID = gql`
  {
    currentFolder @client {
        id
      }
  }
`

export { GET_CURRENT_FOLDER_ID }