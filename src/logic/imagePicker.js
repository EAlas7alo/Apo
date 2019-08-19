import * as ImagePicker from 'expo-image-picker';

const imagePicker = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // base64: true,
    allowsEditing: true,
    aspect: [4, 3],
  })

  if (!result.cancelled) {
    return result
  }

  return undefined
}

export default imagePicker
