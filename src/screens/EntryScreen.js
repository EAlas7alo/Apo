import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SnackBar from 'react-native-snackbar-component'
import { View, StyleSheet, Keyboard, Alert } from 'react-native'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import MyAppTextInput from '../components/TextComponents/MyAppTextInput'
import { MaterialHeaderButtons, Item, HiddenItem } from '../components/HeaderButtons'
import { EDIT_ENTRY_CONTENT, ALL_ENTRIES, DELETE_ENTRY } from '../queries/queries';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'dimgray',
  },
  title: {
    fontSize: 30,
  },
  content: {
    fontSize: 15,
  },
})

const EntryScreen = ({ navigation }) => {
  const entry = navigation.getParam('entry', 0)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [modifiedEntry, setModifiedEntry] = useState(entry)
  const [editContent] = useMutation(EDIT_ENTRY_CONTENT, {
    refetchQueries: [{ query: ALL_ENTRIES }],
  })
  const [deleteEntry] = useMutation(DELETE_ENTRY, {
    refetchQueries: [{ query: ALL_ENTRIES }],
  })

  const handleEdit = () => {
    setEditMode(true)
    console.log('edit pressed')
  }

  const handleSave = async () => {
    console.log(modifiedEntry)
    await editContent({ variables: { ...modifiedEntry, textContent: modifiedEntry.content } })

    setEditMode(false)
    Keyboard.dismiss()
  }

  const handleCancel = () => {
    setModifiedEntry(entry)
    setEditMode(false)
    Keyboard.dismiss()
  }

  const handleDelete = () => {
    setShowSnackbar(true)
  }

  const handleDeletion = async () => {
    await deleteEntry({ variables: { ...entry, id: entry.id } })
    Keyboard.dismiss()
    setEditMode(false)
    navigation.goBack()
  }

  useEffect(() => {
    console.log('xd')
    navigation.setParams({ handleEdit, handleCancel, handleSave, handleDelete, editMode })
  }, [editMode, modifiedEntry])

  const onChangeText = (value) => {
    console.log(value)
    setModifiedEntry({ ...modifiedEntry, content: value })
  }

  return (
    <View style={styles.container}>
      <View>
        <MyAppTextInput
          style={styles.title}
          text={modifiedEntry.title}
          editable={editMode}
          onChangeText={(value) => { setModifiedEntry({ ...modifiedEntry, title: value }) }} />
      </View>
      <MyAppTextInput
        style={styles.content}
        text={modifiedEntry.content}
        editable={editMode}
        multiline={true}
        numberOfLines={1}
        onChangeText={onChangeText}
      />
      <View />
      <SnackBar
        visible={showSnackbar}
        textMessage="Press the button to confirm"
        actionHandler={() => { handleDeletion() }}
        actionText="confirm"
      />
    </View>
  );
};

EntryScreen.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state
  console.log(params)
  return {
    headerTitle: 'hello',
    headerRight: (
      <MaterialHeaderButtons>
        <Item show={params.editMode} title="edit" onPress={params.handleEdit} iconName="md-brush" />
        <Item show={params.editMode} title="delete" onPress={params.handleDelete} iconName="md-trash" />
        <HiddenItem show={!params.editMode} title="cancel" onPress={params.handleCancel} iconName="md-close" />
        <HiddenItem show={!params.editMode} title="save" onPress={params.handleSave} iconName="md-checkmark" />
      </MaterialHeaderButtons>
    ),
  }
}

EntryScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}


export default connect(null, null)(EntryScreen)
