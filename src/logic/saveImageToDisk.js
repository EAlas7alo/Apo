import * as FileSystem from 'expo-file-system';
import uuid from 'uuid/v4'

const saveImageToDisk = async (image) => {
  const imageFolder = FileSystem.documentDirectory.concat('images/')

  try {
    const checkForExistence = await FileSystem.getInfoAsync(imageFolder)
    if (!checkForExistence.exists) {
      await FileSystem.makeDirectoryAsync(imageFolder)
    }

    const imageUri = imageFolder.concat(`/${uuid()}.jpg`)
    await FileSystem.copyAsync({
      from: image,
      to: imageUri })
    return imageUri
  } catch (error) {
    console.log(error)
  }


  return null
}

export default saveImageToDisk
