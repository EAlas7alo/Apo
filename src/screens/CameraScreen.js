import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import Icon from 'react-native-vector-icons/Ionicons'
import { cameraIcon as CameraIcon } from '../constants/Icons'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonView: {
    borderColor: 'white',
    borderWidth: 1,
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const CameraScreen = ({ navigation }) => {
  const [hasPermissions, setHasPermissions] = useState(false)
  const cameraRef = useRef(null)
  console.log(navigation.state)
  useEffect(() => {
    const permissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      setHasPermissions(status === 'granted')
    }
    permissions()
  }, [])

  const snapPhoto = async () => {
    console.log('snapPhoto pressed')
    if (cameraRef) {
      console.log('taking photo')
      const options = { quality: 1, base64: true }
      const photo = await cameraRef.current.takePictureAsync(options)
      navigation.state.addNewImage(photo.uri)
      
    }
  }
  console.log('camera has permissions:', hasPermissions)

  return (
    <View style={styles.mainView}>
      {hasPermissions && (
      <Camera
        style={styles.cameraView}
        ref={cameraRef}
        type={Camera.Constants.Type.back}
      >
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={snapPhoto}>
            <Icon source="md-camera" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
      )}
    </View>
  )
}

CameraScreen.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state
  if (!params) return null
  return {
    header: params.headerVisible,
  }
}

CameraScreen.propTypes = {
  navigation: PropTypes.shape({

  }).isRequired,
}

export default CameraScreen
