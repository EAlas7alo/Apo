import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { View, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { FloatingAction } from 'react-native-floating-action'
import Icon from 'react-native-vector-icons/Ionicons'
import { addJournalEntry } from '../actions/journalEntryActions'
import AddEntryForm from '../components/AddEntryForm'
import { MaterialHeaderButtons, Item } from '../components/HeaderButtons'


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

  const handleSubmit = () => {
    props.addJournalEntry({ title, url, content: textContent })
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
  addJournalEntry: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(null, mapDispatchToProps)(AddEntryScreen)
