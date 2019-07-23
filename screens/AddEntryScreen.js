import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { View, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { addJournalEntry } from '../actions/journalEntryActions'
import AddEntryForm from '../components/AddEntryForm'


const AddEntryScreen = (props) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [textContent, setTextContent] = useState('')

  const handleSubmit = () => {
    console.log(title, url, textContent)
    props.addJournalEntry({ title, url, content: textContent })
    Keyboard.dismiss()
    props.navigation.goBack()
  }

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
    <View>
      <AddEntryForm
        title={title}
        url={url}
        textContent={textContent}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </View>
  );
};

const mapDispatchToProps = {
  addJournalEntry,
}

AddEntryScreen.navigationOptions = ({ navigation }) => ({
  title: 'Add a journal entry',
})

AddEntryScreen.propTypes = {
  addJournalEntry: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(null, mapDispatchToProps)(AddEntryScreen)
