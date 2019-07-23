import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createStore, combineReducers } from 'redux'
import journalEntryReducer from './reducers/journalEntryReducer'
import { Provider } from 'react-redux'
import JournalEntriesScreen from './screens/JournalEntriesScreen';
import AddEntryScreen from './screens/AddEntryScreen'

const MainNavigator = createStackNavigator({
  //Start: { screen: StartScreen },
  JournalEntries: { screen: JournalEntriesScreen },
  AddEntryScreen: { screen: AddEntryScreen },
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
