import { ADD_JOURNAL_ENTRY, GET_ALL_ENTRIES, INIT_ENTRIES } from '../actions/journalEntryActions'


const journalEntryReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_JOURNAL_ENTRY:
      return state.concat({ ...payload, id: state.length + 1 })
    case GET_ALL_ENTRIES:
      return state
    case INIT_ENTRIES:
      return payload.data
    default:
      return state
  }
}

export default journalEntryReducer
