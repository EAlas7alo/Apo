import gql from 'graphql-tag'

const GET_MAIN_FOLDER = gql`
  query mainFolder {
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
      isMainFolder
    }
  }
`

const ALL_FOLDERS = gql`
  query allFolders {
    allFolders {
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
  ALL_FOLDERS,
}
