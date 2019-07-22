import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import StartScreen from './screens/StartScreen'
import JournalEntriesScreen from './screens/JournalEntriesScreen';

const MainNavigator = createStackNavigator({
  //Start: { screen: StartScreen },
  JournalEntries: { screen: JournalEntriesScreen },
  initialRouteName: 'JournalEntries',
})

const AppContainer = createAppContainer(MainNavigator);

const App = () => {
  return (
    <AppContainer />
  )
}

export default App;
