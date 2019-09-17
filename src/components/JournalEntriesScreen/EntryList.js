import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TouchableHighlight } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import ListItem from './ListItem'
import findImagesByEntry from '../../logic/findImagesByEntry'
import { ALL_ENTRIES, SET_CURRENT_ENTRY, SET_CURRENT_IMAGES, GET_CURRENT_IMAGES } from '../../queries/queries'
import { GET_MAIN_FOLDER } from '../../queries/Folders'

const EntryList = ({ navigation }) => {
  const journalEntries = useQuery(ALL_ENTRIES)
  const entries = journalEntries.data.allEntries
  const mainFolder = useQuery(GET_MAIN_FOLDER)
  if (!mainFolder.loading) console.log(mainFolder.data)
  const [setCurrentEntry] = useMutation(SET_CURRENT_ENTRY)
  const [setCurrentImages] = useMutation(SET_CURRENT_IMAGES, {
    refetchQueries: GET_CURRENT_IMAGES,
  })

  const onPressEntry = async (entry) => {
    // console.log(entry)
    const foundFolder = await findImagesByEntry(entry.id)
    console.log('found folder for entry?', foundFolder)
    await setCurrentEntry({ variables: { entry } })
    await setCurrentImages({ variables: { images: entry.images } })
    navigation.navigate('EntryModal',
      { entry: { images: foundFolder, ...entry } })
  }

  const getMainFolderContent = () => {
    const mainFolderEntries = entries.filter(entry => mainFolder.includes(entry))
  }

  return (
    <View>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => { onPressEntry(item) }}
            underlayColor="gray"
          >
            <ListItem
              item={item}
            />
          </TouchableHighlight>
        )}
      />
    </View>
  )
}

EntryList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default EntryList
