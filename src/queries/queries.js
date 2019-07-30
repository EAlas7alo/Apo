import { gql } from 'apollo-boost'

/*
  Date and ID fields are to be generated server-side when backend
  has been implemented.
*/

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
  mutation createEntry($title: String!, $textContent: String!, $id: ID!, $date: Date!) {
    createEntry(
      title: $title,
      content: $textContent,
      id: $id,
      date: $date
    ) {
      title
      content
      id
      date
    }
  }
`

const EDIT_ENTRY_CONTENT = gql`
  mutation editEntry($id: ID!, $content: String!) {
    editEntry(id: $id, content: $content) {
      title
      content
    } 
  }
`

const DELETE_ENTRY = gql`
  mutation deleteEntry($id: ID!) {
    deleteEntry(id: $id)
  }
`
const UPLOAD_IMAGE = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      filename
    }
  }
`

export {
  ALL_ENTRIES,
  CREATE_ENTRY,
  EDIT_ENTRY_CONTENT,
  DELETE_ENTRY,
  UPLOAD_IMAGE }
