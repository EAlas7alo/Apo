import { ADD_JOURNAL_ENTRY, GET_ALL_ENTRIES } from '../actions/journalEntryActions'


const journalEntries = [
  {
    title: 'Read Three-Body Problem',
    content: 'Three-Body Problem by Cixin Liu',
    id: 1,
  },
  {
    title: 'Sold Qt for 200 euros',
    content: 'Qt stock sold for 200',
    id: 2,
  },
  {
    title: 'React Native best Practices',
    content: 'https://medium.com/react-native-training/best-practices-for-creating-react-native-apps-part-1-66311c746df3',
    id: 3,
  },
]

const journalEntryReducer = (state = journalEntries, { type, payload }) => {
  switch (type) {
    case ADD_JOURNAL_ENTRY:
      return state.concat({ ...payload, id: state.length + 1 })
    case GET_ALL_ENTRIES:
      return state
    default:
      return state
  }
}

export default journalEntryReducer
