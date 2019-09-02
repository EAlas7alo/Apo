import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { resolvers, typeDefs } from './src/resolvers/resolvers'
import JournalEntriesScreen from './src/screens/JournalEntriesScreen';
import EntryModal from './src/components/EntryModal/EntryModal'
import ReminderModal from './src/components/ReminderModal/ReminderModal'
import CameraScreen from './src/screens/CameraScreen'


const MainStack = createStackNavigator(
  {
    JournalEntries: {
      screen: JournalEntriesScreen,
    }
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
    ReminderModal: {
      screen: ReminderModal,
    },
    CameraScreen: {
      screen: CameraScreen,
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

const httpLink = createUploadLink({
  uri: 'http://192.168.10.97:4000/',
})


const link = httpLink
const cache = new InMemoryCache()

const client = new ApolloClient({
  cache,
  resolvers,
  typeDefs,
  link,
  formatError: (err) => {
    console.log(err)
    return err;
  },

})

cache.writeData({
  data: {
    currentEntry: null,
    currentImages: [],
    selectedImages: [],
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
