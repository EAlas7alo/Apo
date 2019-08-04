import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { View, Keyboard, StyleSheet, Dimensions } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import SnackBar from 'react-native-snackbar-component'
import AddEntryForm from './AddEntryForm'
import imagePicker from '../logic/imagePicker'
import { MaterialHeaderButtons, Item } from './HeaderButtons'
import { CREATE_ENTRY, ALL_ENTRIES, EDIT_ENTRY_CONTENT, DELETE_ENTRY } from '../queries/queries'
import { imageIcon, mainButtonIcon, checkmarkIcon } from '../constants/Icons'
import ImageModal from './ImageModal';
import saveImageToDisk from '../logic/saveImageToDisk';
import { AndroidBackHandler } from 'react-navigation-backhandler'

/*
  TODO:

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
  const [showSnackBar, setShowSnackBar] = useState(false)

  const [createEntry] = useMutation(CREATE_ENTRY, {
    onError: console.log('adding an entry failed'),
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_ENTRIES })
      dataInStore.allEntries.push(response.data.createEntry)
      console.log('from createEntry', response.data)
      // console.log(store)
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

    let id
    console.log('entry', entry)

    // eslint-disable-next-line no-unused-expressions
    if (isNewEntry) {
      console.log('object to save: ', title, textContent, images, id)
      const data = await createEntry({ variables: { title, textContent, images } })
      console.log(data.data.createEntry)
      id = data.data.createEntry.id
    } else {
      id = entry.id
      await editContent({ variables: { id: entry.id, title, content: textContent, images } })
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

  const handleDeletion = async () => {
    await deleteEntry({ variables: { id: entry.id } })
    Keyboard.dismiss()
    navigation.goBack()
  }

  const handleDeleteConfirm = () => {
    Keyboard.dismiss()
    setShowSnackBar(true)
  }

  const handleChange = (name, text) => {
    if (name === 'title') {
      setTitle(text)
    } else {
      setTextContent(text)
    }
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

  const onBackButtonPress = () => {
    handleSubmit()
  }

  useEffect(() => {
    navigation.setParams({ handleSubmit, handleDeleteConfirm, title, textContent })
  }, [title, textContent, newImages, entry])

  return (
    <View style={styles.modal}>
      <AndroidBackHandler onBackPress={onBackButtonPress} />
      <AddEntryForm
        onPressImage={onPressImage}
        images={images}
        title={title}
        textContent={textContent}
        handleChange={handleChange}
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
      <SnackBar
        visible={showSnackBar}
        textMessage="Press the button to confirm"
        actionHandler={() => { handleDeletion() }}
        actionText="confirm"
      />
    </View>
  );
};

EntryModal.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state
  if (!params) {
    return null
  }
  return {
    title: 'New entry',
    headerBackImage: checkmarkIcon,
    headerLeftContainerStyle: {
      paddingLeft: 10,
    },
    headerRightContainerStyle: {
      paddingRight: 10,
    },
    headerRight: (
      <MaterialHeaderButtons>
        <Item title="delete" onPress={params.handleDeleteConfirm} iconName="md-trash" />
      </MaterialHeaderButtons>
    ),
  }
}

EntryModal.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
}


export default EntryModal
