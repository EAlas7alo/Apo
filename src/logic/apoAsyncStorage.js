import { AsyncStorage } from 'react-native'
import React from 'react'


const apoAsyncStorage = async (id, base64) => {
  try {
    await AsyncStorage.setItem(id, base64)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export default apoAsyncStorage
