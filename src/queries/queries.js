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

const CREATE_ENTRY = gql`
  mutation createEntry($title: String!, $content: Content!) {
    addEntry(
      title: $title,
      content: $content
    ) {
      title
      content {
        textContent
      }
    }
  }
`
export { ALL_ENTRIES, CREATE_ENTRY }
