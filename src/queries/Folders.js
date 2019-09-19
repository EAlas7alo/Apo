import gql from 'graphql-tag'

const GET_MAIN_FOLDER = gql`
  {
    mainFolder {
      entries {
        id
        content
        title
        images
      }
      folders {
        id
        name
      }
      itemOrder
      id
    }
  }
`

export {
  GET_MAIN_FOLDER,
}