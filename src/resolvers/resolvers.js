import gql from 'graphql-tag'
import { GET_ENTRY } from '../queries/queries'

export const typeDefs = gql`
  extend type Entry {
    currentImages: [String!]!
  }
`

export const resolvers = {
  Entry: {
    currentImages: (entry, variables, { cache }) => {
      console.log('currentImages resolver')
      console.log('entry', entry)
      if (!entry.currentImages) {
        console.log(entry.images)
        return entry.images
      }
      // cache.writeData()
      // return entry.currentImages
    },
  },
  Query: {
    getEntry: (_root, variables, { cache, getCacheKey }) => {
      console.log(variables.id)
      console.log(cache.data)
      console.log('getEntry local resolver called')
      const id = getCacheKey({ __typename: 'Entry', id: variables.id })
      console.log(id)
      const fragment = gql`
          fragment entry on Entry {
            title
            content
            images
          }
      `
      try {
        const entry = cache.readFragment({ fragment, id })
        console.log(entry)
        return entry
      } catch (error) {
        console.log(error)
      }
    },
  },
  Mutation: {
    addImage: (_root, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Entry', id: variables.id })
      const fragment = gql`
        fragment images on Entry {
          images
        }
      `
      const entry = cache.readFragment({ fragment, id })
      const data = { ...entry, currentImages: entry.images.concat(variables.image) }
      console.log('adding image to cache', data)
      cache.writeData({ id, data })

      return null
    },
  },
}
