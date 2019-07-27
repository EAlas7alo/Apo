import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, StyleSheet, Keyboard } from 'react-native'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import MyAppTextInput from '../components/TextComponents/MyAppTextInput'
import { MaterialHeaderButtons, Item, HiddenItem } from '../components/HeaderButtons'
import { EDIT_ENTRY_CONTENT, ALL_ENTRIES } from '../queries/queries';

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
  const [editMode, setEditMode] = useState(false)
  const [modifiedEntry, setModifiedEntry] = useState(entry)
  const [editContent] = useMutation(EDIT_ENTRY_CONTENT, {
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

  useEffect(() => {
    console.log('xd')
    navigation.setParams({ handleEdit, handleCancel, handleSave, editMode })
  }, [editMode, modifiedEntry])

  const onChangeText = (value) => {
    console.log(value)
    setModifiedEntry({ ...modifiedEntry, content: value })
  }

  return (
    <View style={styles.container}>
      <View>
        <MyAppTextInput style={styles.title} text={modifiedEntry.title} editable={editMode} onChangeText={(value) => { setModifiedEntry({ ...modifiedEntry, title: value }) }} />
      </View>
      <MyAppTextInput style={styles.content} text={modifiedEntry.content} editable={editMode} onChangeText={onChangeText} />
      <View />
    </View>
  );
};


EntryScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
}

EntryScreen.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state
  console.log(params)
  return {
    headerTitle: 'hello',
    headerRight: (
      <MaterialHeaderButtons>
        <Item show={params.editMode} title="edit" onPress={params.handleEdit} />
        <HiddenItem show={!params.editMode} title="cancel" onPress={params.handleCancel} />
        <HiddenItem show={!params.editMode} title="save" onPress={params.handleSave} />
      </MaterialHeaderButtons>
    ),
  }
}

export default connect(null, null)(EntryScreen)
