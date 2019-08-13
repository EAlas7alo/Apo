import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { View, Keyboard, StyleSheet, Dimensions } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import SnackBar from 'react-native-snackbar-component'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import gql from 'graphql-tag'
import AddEntryForm from './AddEntryForm'
import imagePicker from '../logic/imagePicker'
import { MaterialHeaderButtons, Item } from './HeaderButtons'
import { CREATE_ENTRY, ALL_ENTRIES, EDIT_ENTRY_CONTENT, DELETE_ENTRY, GET_ENTRY, GET_CURRENT_IMAGES } from '../queries/queries'
import { imageIcon, mainButtonIcon, checkmarkIcon, cameraIcon } from '../constants/Icons'
import ImageModal from './ImageModal';
import saveImageToDisk from '../logic/saveImageToDisk';

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
  {
    text: 'Take a picture',
    name: 'take_picture',
    icon: cameraIcon,
    position: 2,
    color: 'white',
  },
];


const ADD_IMAGE = gql`
  mutation addImage($image: String!) {
    addImage(image: $image) @client
  }
`

const EntryModal = ({ navigation }) => {
  const entry = navigation.getParam('entry', null)
  const isNewEntry = !entry
  console.log('entry', entry)
  const [title, setTitle] = useState(entry ? entry.title : '')
  const [textContent, setTextContent] = useState(entry ? entry.content : '')
  const { data: { currentImages } } = useQuery(GET_CURRENT_IMAGES)
  console.log('currentImages:', currentImages)
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [showSnackBar, setShowSnackBar] = useState(false)

  const [createEntry] = useMutation(CREATE_ENTRY, {
    onError: console.log('adding an entry failed'),
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_ENTRIES })
      dataInStore.allEntries.push(response.data.createEntry)
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

  const [addImage] = useMutation(ADD_IMAGE, {
    refetchQueries: [{ query: GET_ENTRY }],
  })

  const handleSubmit = async () => {
    let id
    // eslint-disable-next-line no-unused-expressions

    if (isNewEntry) {
      const data = await createEntry({ variables: { title, textContent, images: currentImages } })
      id = data.data.createEntry.id
    } else {
      id = entry.id
      await editContent({ variables: { id: entry.id, title, content: textContent, images: currentImages } })
    }
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

  const saveImage = async (imageUri) => {
    const image = await saveImageToDisk(imageUri)
    // console.log(image)
    await addImage({ variables: { image } })
    // setImages(images.concat(image))
    // setNewImages(newImages.concat(image))
  }

  const onPressItem = async (name) => {
    Keyboard.dismiss()
    if (name === 'add_image') {
      const chooseImage = await imagePicker()
      saveImage(chooseImage.uri)
    } else if (name === 'take_picture') {
      navigation.navigate('CameraScreen', { headerVisible: null, saveImage })
    }
  }

  const onPressImage = (image) => {
    setModalImage(image)
    setImageModalVisible(true)
  }

  const onBackButtonPress = () => {
    if (title === '' && textContent === '' && images.length === 0) {
      console.log('empty entry, aborting saving')
    } else {
      handleSubmit()
    }
  }

  useEffect(() => {
    navigation.setParams({ handleSubmit, handleDeleteConfirm, title, textContent })
  }, [title, textContent, currentImages, entry])

  return (
    <View style={styles.modal}>
      <AndroidBackHandler onBackPress={onBackButtonPress} />
      <AddEntryForm
        id={!isNewEntry ? entry.id : null}
        onPressImage={onPressImage}
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
    headerLeft: (
      <MaterialHeaderButtons>
        <Item title="save" onPress={params.handleSubmit} iconName="md-checkmark" />
      </MaterialHeaderButtons>
    ),
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
