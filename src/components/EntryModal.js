import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { View, Keyboard, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import AddEntryForm from '../components/AddEntryForm'
import imagePicker from '../logic/imagePicker'
import { MaterialHeaderButtons, Item, HiddenItem } from '../components/HeaderButtons'
import { CREATE_ENTRY, ALL_ENTRIES, EDIT_ENTRY_CONTENT, DELETE_ENTRY } from '../queries/queries'
import { imageIcon, mainButtonIcon } from '../constants/Icons'
import ImageModal from './ImageModal';
import saveImageToDisk from '../logic/saveImageToDisk';

/*
  TODO:
  Statusbar

*/

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  navBar: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.05,
    backgroundColor: 'snow',
  },
})

const actions = [
  {
    text: 'Add an image',
    name: 'add_image',
    icon: imageIcon,
    position: 1,
    color: 'white',
  },
];

const EntryModal = ({ navigation }) => {
  const entry = navigation.getParam('entry', null)
  const isNewEntry = !entry
  console.log('entry', entry)
  const [title, setTitle] = useState(entry ? entry.title : '')
  const [textContent, setTextContent] = useState(entry ? entry.content : '')
  const [images, setImages] = useState(entry ? entry.images : [])
  const [newImages, setNewImages] = useState([])
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [editMode, setEditMode] = useState(true)

  const [createEntry] = useMutation(CREATE_ENTRY, {
    onError: console.log('adding an entry failed'),
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_ENTRIES })
      dataInStore.allEntries.push(response.data.createEntry)
      console.log('from createEntry', response.data)
      //console.log(store)
      store.writeQuery({
        query: ALL_ENTRIES,
        data: dataInStore,
      })
    },
  })

  const [editContent] = useMutation(EDIT_ENTRY_CONTENT, {
    refetchQueries: [{ query: ALL_ENTRIES }],
  })
  const [deleteEntry] = useMutation(DELETE_ENTRY, {
    refetchQueries: [{ query: ALL_ENTRIES }],
  })

  const handleSubmit = async () => {
    console.log('images: ', images)
    console.log('isNewEntry', isNewEntry)

    let id = entry.id
    console.log('entry', entry)

    // eslint-disable-next-line no-unused-expressions
    if (isNewEntry) {
      id = await createEntry({ variables: { title, textContent } }).data.createEntry.id
    } else {
      await editContent({ variables: { id: entry.id, content: textContent } })
    }
    console.log(id)
    console.log(images)
    newImages.forEach(async image => {
      console.log('iterating images')
      await saveImageToDisk(image, id)
    })
    Keyboard.dismiss()
    navigation.goBack()
  }

  const handleChange = (name, text) => {
    if (name === 'title') {
      setTitle(text)
    } else {
      setTextContent(text)
    }
  }

  const handleBlur = () => {

  }

  const onPressItem = async (name) => {
    if (name === 'add_image') {
      Keyboard.dismiss()
      const image = await imagePicker()
      console.log('from onPressItem', image.uri)
      setImages(images.concat(image.uri))
      setNewImages(newImages.concat(image.uri))
    }
  }

  const onPressImage = (image) => {
    console.log('onPressImage:', image)
    setModalImage(image)
    setImageModalVisible(true)
  }

  useEffect(() => {
    navigation.setParams({ handleSubmit, title, textContent, editMode })
  }, [title, textContent, newImages, entry])

  return (
    <View style={styles.modal}>
      <AddEntryForm
        onPressImage={onPressImage}
        images={images}
        title={title}
        textContent={textContent}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <FloatingAction
        showBackground={false}
        listenKeyboard
        dismissKeyboardOnPress
        color="white"
        actions={actions}
        floatingIcon={mainButtonIcon}
        onPressItem={(name) => {
          onPressItem(name)
        }}
      />
      <ImageModal
        image={modalImage}
        visible={imageModalVisible}
        setVisible={setImageModalVisible}
        onRequestClose={console.log('xd')}
      />
    </View>
  );
};

EntryModal.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state
  if (!params) {
    return null
  }
  console.log(params)
  return {
    title: 'New entry',
    headerRight: (
      <MaterialHeaderButtons>
        <HiddenItem title="edit" iconName="md-brush" />
        <HiddenItem title="delete" iconName="md-trash" />
        <Item title="cancel" iconName="md-close" />
        <Item title="save" onPress={params.handleSubmit} iconName="md-checkmark" />
      </MaterialHeaderButtons>
    ),
  }
}

EntryModal.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
}


export default EntryModal
