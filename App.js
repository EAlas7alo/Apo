import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import journalEntryReducer from './reducers/journalEntryReducer'
import JournalEntriesScreen from './screens/JournalEntriesScreen';
import AddEntryScreen from './screens/AddEntryScreen'
import EntryScreen from './screens/EntryScreen'

const MainNavigator = createStackNavigator({
  JournalEntries: { screen: JournalEntriesScreen },
  AddEntryScreen: { screen: AddEntryScreen },
  EntryScreen: { screen: EntryScreen },
  initialRouteName: 'JournalEntries',
})

const rootReducer = combineReducers({
  journalEntryReducer,
})

const store = createStore(rootReducer)

const AppContainer = createAppContainer(MainNavigator);


const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App;
