import gql from 'graphql-tag'
import { GET_MAIN_FOLDER } from '../queries/Folders'

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
    getCurrentFolder: async (_, __, { client, cache }) => {
      console.log('xd')
      //console.log(cache.data)
      try {
        const { currentFolder } = cache.readQuery({
          query: gql`
            query currentFolder {
              currentFolder @client {
                id
                entries {
                  id
                  title
                  content
                  images
                }
                folders {
                  id
                  name
                }
              }
            }
          `,
        })
        if (currentFolder.id === 0) {
          const { data: { mainFolder } } = await client.query({ query: GET_MAIN_FOLDER })
          console.log('fetching mainfolder from server')
          //console.log('mainFolder:', mainFolder)
          cache.writeData({
            data: {
              currentFolder: mainFolder,
            },
          })
          return mainFolder
        }
        console.log('currentFolder set', currentFolder)
        return currentFolder
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
    setCurrentFolder: (_, args, { cache }) => {
      cache.writeData({ data: { currentFolder: args.folder } })
    },
  },
}
