import gql from 'graphql-tag'

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
  mutation editEntry($id: ID!, $title: String, $content: String, $images: [String!]) {
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
const GET_ENTRY = gql`
  query getEntry($id: String!) {
    getEntry(id: $id) @client {
      title
      content
      images
      currentImages @client
    }
  }
`
const SET_CURRENT_ENTRY = gql`
  mutation setCurrentEntry($entry: Entry!) {
    setCurrentEntry(entry: $entry) @client
  }
`

const DELETE_IMAGE_FROM_ENTRY = gql`
  mutation deleteImageFromEntry($entry: Entry!, $image: String!) {
    deleteImageFromEntry(entry: $entry, image: $image) 
  }
`


export {
  ALL_ENTRIES,
  CREATE_ENTRY,
  EDIT_ENTRY_CONTENT,
  DELETE_ENTRY,
  GET_ENTRY,
  SET_CURRENT_ENTRY,
  DELETE_IMAGE_FROM_ENTRY,
}
