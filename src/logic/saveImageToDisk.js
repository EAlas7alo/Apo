import * as FileSystem from 'expo-file-system';
import uuid from 'uuid/v4'

const saveImageToDisk = async (image) => {
  const imageFolder = FileSystem.documentDirectory.concat('images/')
  console.log(imageFolder)
  console.log('wtf')
  console.log(image)

  try {
    const checkForExistence = await FileSystem.getInfoAsync(imageFolder)
    console.log(checkForExistence)
    if (!checkForExistence.exists) {
      await FileSystem.makeDirectoryAsync(imageFolder)
    }

    const imageUri = imageFolder.concat(`/${uuid()}.jpg`)
    console.log('returning from saveImageToDisk:', imageUri)
    await FileSystem.copyAsync({
      from: image,
      to: imageUri })
    const imageDir = await FileSystem.readDirectoryAsync(imageFolder)
    //console.log(imageDir)
    return imageUri
  } catch (error) {
    console.log(error)
  }


  return null
}

export default saveImageToDisk
