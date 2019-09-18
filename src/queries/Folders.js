import gql from 'graphql-tag'

const GET_MAIN_FOLDER = gql`
  {
    mainFolder {
      entries {
        id
        content
      }
      folders {
        id
        entries
        folders
      }
    }
  }
`

export {
  GET_MAIN_FOLDER,
}