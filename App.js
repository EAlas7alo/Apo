import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import gql from 'graphql-tag';
import JournalEntriesScreen from './src/screens/JournalEntriesScreen';
import AddEntryScreen from './src/screens/AddEntryScreen'
import EntryScreen from './src/screens/EntryScreen'
import EntryModal from './src/components/EntryModal'
import CameraScreen from './src/screens/CameraScreen'


const MainStack = createStackNavigator(
  {
    JournalEntries: {
      screen: JournalEntriesScreen,
    },
    AddEntryScreen: {
      screen: AddEntryScreen,
    },
    EntryScreen: {
      screen: EntryScreen,
    },
  },
  {
    initialRouteName: 'JournalEntries',
    headerMode: 'none',
  },
)

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    EntryModal: {
      screen: EntryModal,
    },
    CameraScreen: {
      screen: CameraScreen,
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      title: 'Entries',
    },
  },
)

const httpLink = createUploadLink({
  uri: 'http://192.168.10.97:4000/',
})


const link = httpLink
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  },
  resolvers: {
    Query: {
      getEntry: (_root, variables, { cache, getCacheKey }) => {
        console.log(variables.id)
        console.log(cache.data)
        const id = getCacheKey({ __typename: 'Entry', id: variables.id })
        const fragment = gql`
            fragment entry on Entry {
              title
              content
              images
            }
        `
        const entry = cache.readFragment({ fragment, id })

        return entry
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
        const data = { ...entry, images: entry.images.concat(variables.image)}
        cache.writeData({ id, data })
        
        return null
      },
    },
  },
})

cache.writeData({
  data: {
    
  },
})

const AppContainer = createAppContainer(RootStack);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  )
}

export default App;
