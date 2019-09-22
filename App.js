import React from 'react'
import { SERVER_IP } from 'react-native-dotenv'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { resolvers, typeDefs } from './src/resolvers/resolvers'
import JournalEntriesScreen from './src/screens/JournalEntriesScreen';
import EntryModal from './src/components/EntryModal/EntryModal'
import ReminderModal from './src/components/ReminderModal/ReminderModal'
import CameraScreen from './src/screens/CameraScreen'
import ReminderScreen from './src/screens/ReminderScreen';
import Drawer from './src/components/Drawer';
import { GET_MAIN_FOLDER } from './src/queries/Folders'

const EntryStack = createStackNavigator(
  {
    Main: {
      screen: JournalEntriesScreen,
    },
    EntryModal: {
      screen: EntryModal,
    },
    CameraScreen: {
      screen: CameraScreen,
    },
    ReminderModal: {
      screen: ReminderModal,
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      title: 'Entries',
      headerTitleStyle: {
        color: 'white',
      },
      headerStyle: {
        backgroundColor: 'dimgray',
      },
    },
  },
)

const ReminderStack = createStackNavigator(
  {
    RemindersScreen: {
      screen: ReminderScreen,
    },
    ReminderModal: {
      screen: ReminderModal,
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        color: 'white',
      },
      headerStyle: {
        backgroundColor: 'dimgray',
      },
    },
  },
)

const DrawerStack = createDrawerNavigator(
  {
    Entries: {
      screen: EntryStack,
    },
    Reminders: {
      screen: ReminderStack,
    },
  },
  {
    initialRouteName: 'Entries',
    headerMode: 'none',
    contentComponent: Drawer,
  },
)

const serverIP = SERVER_IP
console.log(serverIP)

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
    })
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = createHttpLink({
  uri: serverIP,
})

const link = ApolloLink.from([
  errorLink,
  httpLink,
])
const cache = new InMemoryCache({ dataIdFromObject: object => `${object.__typename}_${object.id}` })

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs,
  queryDeduplication: true,
})

cache.writeData({
  data: {
    currentEntry: null,
    currentFolder: {
      __typename: 'Folder',
      entries: [],
      folders: [],
      id: 0,
    },
    currentImages: [],
    selectedImages: [],
  },
})

const AppContainer = createAppContainer(DrawerStack);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  )
}

export default App;
