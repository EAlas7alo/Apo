import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native'

const StartScreen = (props) => {

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>Hello!</Text>
      <Button
        title='Go to Entries'
        onPress={() => props.navigation.navigate('JournalEntries')}
      />
    </View>
  )
}
StartScreen.navigationOptions = ({ navigation }) => ({
  title: 'Start',
})

export default StartScreen
