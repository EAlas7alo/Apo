import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { View, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { FloatingAction } from 'react-native-floating-action'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import { ReactNativeFile } from 'apollo-upload-client'
import { addJournalEntry } from '../actions/journalEntryActions'
import AddEntryForm from '../components/AddEntryForm'
import imagePicker from '../logic/imagePicker'
import { MaterialHeaderButtons, Item } from '../components/HeaderButtons'
import { CREATE_ENTRY, ALL_ENTRIES, UPLOAD_IMAGE } from '../queries/queries'
import { imageIcon, mainButtonIcon } from '../constants/Icons'
import ImageModal from '../components/ImageModal';
import saveImageToDisk from '../logic/saveImageToDisk';


/*
  TODO:
    Advanced options menu: isEditable
    Attachments
    Confirmation on back press
*/

const actions = [
  {
    text: 'Add an image',
    name: 'add_image',
    icon: imageIcon,
    position: 1,
    color: 'white',
  },
];


const AddEntryScreen = (props) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [textContent, setTextContent] = useState('')
  const [images, setImages] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState(null)


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

  const [uploadImage] = useMutation(UPLOAD_IMAGE)

  const handleSubmit = async () => {
    console.log('images: ', images)
    const entry = await createEntry({ variables: { title, textContent } })
    console.log(entry)
    console.log(images)
    images.forEach(async image => {
      console.log('iterating images')
      await saveImageToDisk(image, entry.data.createEntry.id)
    })
    Keyboard.dismiss()
    props.navigation.goBack()
  }

  useEffect(() => {
    props.navigation.setParams({ handleSubmit, title, url, textContent })
  }, [title, url, textContent, images])

  const handleChange = (name, text) => {
    if (name === 'title') {
      setTitle(text)
    } else if (name === 'url') {
      setUrl(text)
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
      //const imageWithMeta = new ReactNativeFile({uri: image.uri, type: 'image/jpg', name: 'name.jpg'})

      setImages(images.concat(image.uri))
    }
  }

  const onPressImage = (image) => {
    console.log('onPressImage:', image)
    setModalImage(image)
    setModalVisible(true)
  }

  return (
    <View style={{ flex: 1 }}>
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
        visible={modalVisible}
        setVisible={setModalVisible}
        onRequestClose={console.log('xd')}
      />
    </View>
  );
};

const mapDispatchToProps = {
  addJournalEntry,
}

AddEntryScreen.navigationOptions = ({ navigation }) => ({
  title: 'New entry',
  headerRight: (
    <MaterialHeaderButtons>
      <Item title="save" onPress={() => { navigation.state.params.handleSubmit() }} />
    </MaterialHeaderButtons>
  ),
})

AddEntryScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(null, mapDispatchToProps)(AddEntryScreen)
