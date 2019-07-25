import { gql } from 'apollo-boost'

const ALL_ENTRIES = gql`
  {
    allEntries {
      title
      content
      id
    }
  }
`
export { ALL_ENTRIES }