import gql from 'graphql-tag'
import { GET_ENTRY } from '../queries/queries'

export const typeDefs = gql`
  extend type Entry {
    currentImages: [String!]!
  }
`

export const resolvers = {
  Entry: {

  },
  Query: {
    getEntry: (_root, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Entry', id: variables.id })
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
    addImage: (_root, variables, { cache }) => {
      const { currentImages } = cache.readQuery({
        query: gql`
          query getImages {
            currentImages @client
          }
        `,
      })
      const newImages = currentImages.concat(variables.image)
      console.log('adding image to cache', newImages)
      cache.writeData({ data: { currentImages: newImages } })

      return null
    },
    /* All images in entry view */
    setCurrentImages: (_, variables, { cache }) => {
      cache.writeData({ data: { currentImages: variables.images } })
      return null
    },
    setCurrentEntry: (_, variables, { cache }) => {
      cache.writeData({ data: { currentEntry: variables.entry } })
      return null
    },
    /* Highlighted images in entry view */
    setSelectedImages: (_, variables, { cache }) => {
      const selectedImagesQuery = gql`
        {
          selectedImages @client
        }
      `
      const { selectedImages } = cache.readQuery({
        query: selectedImagesQuery,
      })
      if (selectedImages.includes(variables.image)) {
        cache.writeData({ data: { selectedImages: selectedImages.filter(image => image !== variables.image) } })
        return null
      }

      cache.writeData({ data: { selectedImages: selectedImages.concat(variables.image) } })
      return null
    },
    deleteSelectedImages: (_, variables, { cache }) => {
      const selectedImagesQuery = gql`
      {
        selectedImages @client
        currentImages @client
      }
      `
      const { selectedImages, currentImages } = cache.readQuery({
        query: selectedImagesQuery,
      })

      cache.writeData({
        data:
          { currentImages: currentImages.filter(
            image => !selectedImages.includes(image),
          ) },
      })
    },
    getCurrentFolder: (_, __, { cache }) => {
      if (cache.data.currentFolder === null) {
        
      }
    },
    setCurrentFolder: (_, args, { cache }) => {

    },
  },
}
