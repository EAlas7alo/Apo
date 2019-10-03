import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import Icon from 'react-native-vector-icons/Ionicons'
import { withNavigationFocus } from 'react-navigation'

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
    justifyContent: 'space-around',
  },
  snapPhotoParent: {
    justifyContent: 'center',
  },
  snapPhotoButton: {
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: 'transparent',
  },
  cameraSettingsParent: {
    justifyContent: 'center',
  },
  cameraSettingsButtons: {
  },
})

const CameraScreen = ({ navigation, isFocused }) => {
  const [hasPermissions, setHasPermissions] = useState(false)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const [flashIcon, setFlashIcon] = useState('md-flash-off')
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const cameraRef = useRef(null)

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.goBack()
    return true
  })

  useEffect(() => {
    const permissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      setHasPermissions(status === 'granted')
    }
    permissions()
  }, [])

  const handleBackPress = () => {
    navigation.goBack()
    return true
  }

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    } else {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    }
  }, [isFocused])

  const snapPhoto = async () => {
    if (cameraRef) {
      const options = { quality: 0.2, base64: true }
      try {
        const photo = await cameraRef.current.takePictureAsync(options)
        navigation.state.params.saveImage(photo.uri)
        navigation.goBack()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const switchCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    )
  }

  const switchFlash = () => {
    if (flash === Camera.Constants.FlashMode.on) {
      setFlash(Camera.Constants.FlashMode.off)
      setFlashIcon('md-flash-off')
    } else {
      setFlash(Camera.Constants.FlashMode.on)
      setFlashIcon('md-flash')
    }
  }

  return (
    <View style={styles.mainView}>
      {hasPermissions && (
      <Camera
        style={styles.cameraView}
        ref={cameraRef}
        type={cameraType}
        ratio="16:9"
        flashMode={flash}
      >
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.cameraSettingsParent} onPress={switchFlash}>
            <Icon style={styles.cameraSettingsButtons} name={flashIcon} size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.snapPhotoParent} onPress={snapPhoto}>
            <View style={styles.snapPhotoButton} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraSettingsParent} onPress={switchCameraType}>
            <Icon style={styles.cameraSettingsButtons} name="md-reverse-camera" size={40} color="white" />
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
    goBack: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        saveImage: PropTypes.func.isRequired,
      }),
    }),
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
}

export default withNavigationFocus(CameraScreen)
