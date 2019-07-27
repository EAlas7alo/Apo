import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { View, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { FloatingAction } from 'react-native-floating-action'
import Icon from 'react-native-vector-icons/Ionicons'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import uuid from 'uuid'
import { addJournalEntry } from '../actions/journalEntryActions'
import AddEntryForm from '../components/AddEntryForm'
import { MaterialHeaderButtons, Item } from '../components/HeaderButtons'
import { CREATE_ENTRY, ALL_ENTRIES } from '../queries/queries'

/*
  TODO:
    Advanced options menu: isEditable
    Attachments
    Confirmation on back press
*/

const mainButtonIcon = <Icon name="md-attach" size={30} color="white" />
const imageIcon = <Icon name="md-image" size={30} color="white" />
const actions = [
  {
    text: 'Add an image',
    name: 'add_image',
    icon: imageIcon,
    position: 1,
  },
];


const AddEntryScreen = (props) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [textContent, setTextContent] = useState('')

  const [createEntry] = useMutation(CREATE_ENTRY, {
    onError: console.log('adding an entry failed'),
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_ENTRIES })
      dataInStore.allEntries.push(response.data.createEntry)
      console.log(response.data)
      store.writeQuery({
        query: ALL_ENTRIES,
        data: dataInStore,
      })
    },
  })

  const handleSubmit = async () => {
    await createEntry({ variables: { title, textContent, date: new Date(), id: uuid.v4() } })
    Keyboard.dismiss()
    props.navigation.goBack()
  }

  useEffect(() => {
    props.navigation.setParams({ handleSubmit, title, url, textContent })
  }, [title, url, textContent])

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

  return (
    <View style={{ flex: 1 }}>
      <AddEntryForm
        title={title}
        textContent={textContent}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <FloatingAction
        showBackground={false}
        actions={actions}
        floatingIcon={mainButtonIcon}
        onPressItem={(name) => {
          onPressItem(name)
        }}
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
