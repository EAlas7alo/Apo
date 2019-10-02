import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { View, Keyboard, StyleSheet, Dimensions, BackHandler } from 'react-native'
import { FloatingAction } from 'react-native-floating-action'
import { useQuery, useMutation } from '@apollo/react-hooks'
import SnackBar from 'react-native-snackbar-component'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import gql from 'graphql-tag'
import { withNavigationFocus } from 'react-navigation'
import AddEntryForm from './AddEntryForm'
import imagePicker from '../../logic/imagePicker'
import { MaterialHeaderButtons, Item } from '../HeaderButtons'
import { CREATE_ENTRY, EDIT_ENTRY_CONTENT, DELETE_ENTRY, GET_ENTRY, GET_CURRENT_IMAGES } from '../../queries/queries'
import { imageIcon, mainButtonIcon, checkmarkIcon, cameraIcon } from '../../constants/Icons'
import ImageModal from './ImageModal';
import saveImageToDisk from '../../logic/saveImageToDisk';
import { GET_CURRENT_FOLDER_ID } from './queries'
import { GET_CURRENT_FOLDER } from '../JournalEntriesScreen/queries';

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

const EntryModal = ({ navigation, isFocused }) => {
  const entry = navigation.getParam('entry', null)
  const isNewEntry = !entry

  const { data: { currentFolder } } = useQuery(GET_CURRENT_FOLDER_ID)

  const [title, setTitle] = useState(entry ? entry.title : '')
  const [textContent, setTextContent] = useState(entry ? entry.content : '')

  const { data: { currentImages } } = useQuery(GET_CURRENT_IMAGES)

  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [fabActive, setFabActive] = useState(false)

  const [createEntry] = useMutation(CREATE_ENTRY, {
    update(cache, { data: { createEntry } }) {
      const { currentFolder } = cache.readQuery({ query: GET_CURRENT_FOLDER });
      cache.writeQuery({
        query: GET_CURRENT_FOLDER,
        data:
          { currentFolder:
            { ...currentFolder,
              entries: currentFolder.entries.concat([createEntry]),
            },
          },
      })
    },
  })

  const [editContent] = useMutation(EDIT_ENTRY_CONTENT)

  const [deleteEntry] = useMutation(DELETE_ENTRY, {
    update(cache, { data: { deleteEntry } }) {
      const { currentFolder } = cache.readQuery({ query: GET_CURRENT_FOLDER });
      cache.writeQuery({
        query: GET_CURRENT_FOLDER,
        data:
          { currentFolder:
            { ...currentFolder,
              entries: currentFolder.entries.filter(entry => entry.id !== deleteEntry),
            },
          },
      })
    },
  })

  const [addImage] = useMutation(ADD_IMAGE, {
    refetchQueries: [{ query: GET_ENTRY }],
  })

  const handleSubmit = async () => {
    if (isNewEntry) {
      await createEntry({
        variables:
          { title,
            textContent,
            images: currentImages,
            folder: currentFolder.id,
          },
      })
    } else {
      await editContent({
        variables:
        { id: entry.id,
          title,
          content: textContent,
          images: currentImages,
        },
      })
    }
    Keyboard.dismiss()
    navigation.goBack()
  }

  const handleDeletion = async () => {
    await deleteEntry({ variables: { id: entry.id, folder: currentFolder.id } })
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
    await addImage({ variables: { image } })
  }

  const onPressItem = async (name) => {
    Keyboard.dismiss()
    if (name === 'add_image') {
      const chooseImage = await imagePicker()
      if (chooseImage) saveImage(chooseImage.uri)
    } else if (name === 'take_picture') {
      navigation.navigate('CameraScreen', { headerVisible: null, saveImage })
    }
  }

  const onPressImage = (image) => {
    setModalImage(image)
    setImageModalVisible(true)
  }

  const onExit = () => {
    console.log('onexit called')
    if (fabActive) return true
    if (title === '' && textContent === '' && currentImages.length === 0) {
      return false
    }
    handleSubmit()
    return true
  }
  
  useEffect(() => {
    navigation.setParams({ onExit, handleDeleteConfirm, title, textContent, isNewEntry })
  }, [title, textContent, currentImages, entry, currentFolder])

  return (
    <View style={styles.modal}>
      <AndroidBackHandler onBackPress={onExit} />
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
        onPressMain={() => { setFabActive(!fabActive) }}
      />
      <ImageModal
        image={modalImage}
        visible={imageModalVisible}
        setVisible={() => { setImageModalVisible(false) }}
        onRequestClose={() => { setImageModalVisible(false) }}
      />
      <SnackBar
        autoHidingTime={5000}
        visible={showSnackBar}
        textMessage="Press the button to confirm"
        actionHandler={() => { handleDeletion() }}
        actionText="confirm"
      />
    </View>
  )
}

EntryModal.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state
  if (!params) {
    return null
  }
  return {
    title: 'New entry',
    headerLeft: (
      <MaterialHeaderButtons>
        <Item title="save" onPress={params.onExit} iconName="md-checkmark" />
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
        {!params.isNewEntry && (
          <Item title="delete" onPress={params.handleDeleteConfirm} iconName="md-trash" />
        )}
      </MaterialHeaderButtons>

    ),
  }
}

EntryModal.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}


export default withNavigationFocus(EntryModal)
