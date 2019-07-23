import { ADD_JOURNAL_ENTRY, GET_ALL_ENTRIES } from '../actions/journalEntryActions'


const journalEntries = [
  {
    title: 'Read Three-Body Problem',
    content: 'Three-Body Problem by Cixin Liu',
  },
  {
    title: 'Sold Qt for 200 euros',
    content: 'Qt stock sold for 200',
  },
  {
    title: 'React Native best Practices',
    content: 'https://medium.com/react-native-training/best-practices-for-creating-react-native-apps-part-1-66311c746df3'
  },
]

const journalEntryReducer = (state = journalEntries, { type, payload }) => {
  switch (type) {
    case ADD_JOURNAL_ENTRY:
      return state.concat(payload)
    case GET_ALL_ENTRIES:
      return state
    default:
      return state
  }
}

export default journalEntryReducer
