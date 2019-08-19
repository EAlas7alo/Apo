import FileSystem from 'expo-file-system'

const deleteFile = async (fileUri) => {
  const deleteFile = await FileSystem.deleteAsync(fileUri)
  return deleteFile
}

export default deleteFile
