export const ADD_IMAGE = 'ADD_IMAGE'
export const ALL_IMAGES = 'ALL_IMAGES'


export const addImage = (payload) => ({
  type: ADD_IMAGE,
  payload,
})

export const setJournalEntries = (entries) => ({
  type: ALL_IMAGES,
  entries,
})
