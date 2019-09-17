import gql from 'graphql-tag'

const GET_MAIN_FOLDER = gql`
  {
    mainFolder {
      content {
        content
        id
        
      }
    }
  }
`

export {
  GET_MAIN_FOLDER,
}