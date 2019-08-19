import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'

import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

const camera = () => {
  const [hasPermissions, setHasPermissions] = useState(false)

  useEffect(() => {
    const status = async () => {
      const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
      return cameraPermission
    }

    setHasPermissions(status())
  }, [])

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default camera
