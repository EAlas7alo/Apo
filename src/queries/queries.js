import gql from 'graphql-tag'

/*
  Date and ID fields are to be generated server-side when backend
  has been implemented.
*/

const ALL_ENTRIES = gql`
  {
    allEntries {
      title
      content
      images
      id
    }
  }
`

const CREATE_ENTRY = gql`
  mutation createEntry($title: String!, $textContent: String!, $images: [String!]!) {
    createEntry(
      title: $title,
      content: $textContent,
      images: $images,
    ) {
      title
      content
      images
      id
      date
    }
  }
`

const EDIT_ENTRY_CONTENT = gql`
  mutation editEntry($id: ID!, $title: String!, $content: String!, $images: [String!]!) {
    editEntry(id: $id, title: $title, content: $content, images: $images) {
      title
      content
      images
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
    uploadImage(file: $file)
  }
`

export {
  ALL_ENTRIES,
  CREATE_ENTRY,
  EDIT_ENTRY_CONTENT,
  DELETE_ENTRY,
  UPLOAD_IMAGE }
