import * as FileSystem from 'expo-file-system';
import uuid from 'uuid/v4'

const saveImageToDisk = async (image, entryId) => {
  const userFolder = FileSystem.documentDirectory.concat(`${entryId}/`)
  console.log(userFolder)
  console.log('wtf')
  console.log(image)

  try {
    const checkForExistence = await FileSystem.getInfoAsync(userFolder)
    console.log(checkForExistence)
    if (!checkForExistence.exists) {
      await FileSystem.makeDirectoryAsync(userFolder)
    }
    await FileSystem.copyAsync({
      from: image,
      to: userFolder.concat(`/${uuid()}.jpg`) }) 
    const imageDir = await FileSystem.readDirectoryAsync(userFolder)
    console.log(imageDir)
  } catch (error) {
    console.log(error)
  }


  return true
}

export default saveImageToDisk
