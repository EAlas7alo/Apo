import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, TextInput } from 'react-native'

const styles = StyleSheet.create({
  defaults: {
    color: 'white',
  },

})

const MyAppTextInput = ({ text, style, ...props }) => {
  return (
    <TextInput
      style={[styles.defaults, style]}
      value={text}
      {...props}
    />
  );
};

MyAppTextInput.defaultProps = {
  style: null,
}

MyAppTextInput.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default MyAppTextInput
