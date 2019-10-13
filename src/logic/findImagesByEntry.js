import * as FileSystem from 'expo-file-system'

const findImagesByEntry = async (id) => {
  try {
    const entryDirectory = await FileSystem.getInfoAsync(FileSystem.documentDirectory.concat(id))
    if (!entryDirectory.exists) {
      return []
    }
    const images = await FileSystem.readDirectoryAsync(entryDirectory.uri)
    return images.map(image => {
      return entryDirectory.uri.concat('/', image)
    })
  } catch (error) {
    console.log(error)
  }

  return []
}

export default findImagesByEntry
