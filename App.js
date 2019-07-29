import React from 'react'
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import journalEntryReducer from './src/reducers/journalEntryReducer'
import JournalEntriesScreen from './src/screens/JournalEntriesScreen';
import AddEntryScreen from './src/screens/AddEntryScreen'
import EntryScreen from './src/screens/EntryScreen'

const MainNavigator = createStackNavigator({
  JournalEntries: { screen: JournalEntriesScreen },
  AddEntryScreen: { screen: AddEntryScreen },
  EntryScreen: { screen: EntryScreen },
  initialRouteName: 'JournalEntries',
})

const httpLink = createHttpLink({
  uri: 'http://192.168.10.97:4000/',
})


const link = httpLink


const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  } 
})


const rootReducer = combineReducers({
  journalEntryReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

const AppContainer = createAppContainer(MainNavigator);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </ApolloProvider>
  )
}

export default App;
