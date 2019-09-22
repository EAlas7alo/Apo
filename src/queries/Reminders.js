import gql from 'graphql-tag'

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
  ALL_REMINDERS,
  CREATE_REMINDER,
  DELETE_REMINDER,
  ACTIVE_REMINDERS,
  TOGGLE_RESOLVED_STATUS,
}
