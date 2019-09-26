import gql from 'graphql-tag'

const ALL_ENTRIES = gql`
  query allEntries {
    allEntries {
      title
      content
      images
      id
    }
  }
`
const ALL_REMINDERS = gql`
 query allReminders {
   allReminders {
      content
      dateExpiry
      id
      resolved
   }
 }
`

const ACTIVE_REMINDERS = gql`
 query activeReminders {
   activeReminders {
     content
     resolved
     dateExpiry
     id
   }
 }
`

const CREATE_ENTRY = gql`
  mutation createEntry($title: String!, $textContent: String!, $images: [String!]!, $folder: ID!) {
    createEntry(
      title: $title,
      content: $textContent,
      images: $images,
      folder: $folder,
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
      id
      title
      content
      images
    } 
  }
`

const DELETE_ENTRY = gql`
  mutation deleteEntry($id: ID!, $folder: ID!) {
    deleteEntry(id: $id, folder: $folder)
  }
`
const UPLOAD_IMAGE = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file)
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

const SET_CURRENT_IMAGES = gql`
  mutation setCurrentImages($images: [String!]!) {
    setCurrentImages(images: $images) @client
  }
`

const GET_CURRENT_IMAGES = gql`
  query getCurrentImages($id: String!) {
    currentImages @client
  }
`
const GET_SELECTED_IMAGES = gql`
  query getSelectedImages @client {
    selectedImages @client
  }
`
const DELETE_IMAGE_FROM_ENTRY = gql`
  mutation deleteImageFromEntry($entry: Entry!, $image: String!) {
    deleteImageFromEntry(entry: $entry, image: $image) 
  }
`
const CREATE_REMINDER = gql`
  mutation createReminder($dateExpiry: Date!, $content: String!) {
    createReminder(dateExpiry: $dateExpiry, content: $content) {
      dateExpiry
    }
  }
`

const DELETE_REMINDER = gql`
  mutation deleteReminder($id: ID!) {
    deleteReminder(id: $id) 
  }
`

const TOGGLE_RESOLVED_STATUS = gql`
  mutation toggleResolvedStatus($id: ID!) {
    toggleResolvedStatus(id: $id) 
  }
`

export {
  ALL_ENTRIES,
  CREATE_ENTRY,
  EDIT_ENTRY_CONTENT,
  DELETE_ENTRY,
  UPLOAD_IMAGE,
  GET_ENTRY,
  SET_CURRENT_ENTRY,
  SET_CURRENT_IMAGES,
  GET_CURRENT_IMAGES,
  GET_SELECTED_IMAGES,
  DELETE_IMAGE_FROM_ENTRY,
  ALL_REMINDERS,
  CREATE_REMINDER,
  DELETE_REMINDER,
  ACTIVE_REMINDERS,
  TOGGLE_RESOLVED_STATUS,
}
