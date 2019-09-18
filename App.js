import React from 'react'
import { SERVER_IP } from 'react-native-dotenv'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { resolvers, typeDefs } from './src/resolvers/resolvers'
import JournalEntriesScreen from './src/screens/JournalEntriesScreen';
import EntryModal from './src/components/EntryModal/EntryModal'
import ReminderModal from './src/components/ReminderModal/ReminderModal'
import CameraScreen from './src/screens/CameraScreen'
import ReminderScreen from './src/screens/ReminderScreen';
import Drawer from './src/components/Drawer';

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

const httpLink = createUploadLink({
  uri: serverIP,
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
    currentFolder: null,
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
