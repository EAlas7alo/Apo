export const ADD_JOURNAL_ENTRY = 'ADD_JOURNAL_ENTRY'
export const GET_ALL_ENTRIES = 'GET_ALL_ENTRIES'

export const addJournalEntry = (payload) => ({
  type: ADD_JOURNAL_ENTRY,
  payload,
})

export const getJournalEntries = (payload) => ({
  type: GET_ALL_ENTRIES,
  payload,
})
