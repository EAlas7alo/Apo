import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  defaults: {
    color: 'white',
  },

})

const MyAppText = ({ text, style, ...props }) => {
  return (
    <Text style={[styles.defaults, style]} {...props}>{text}</Text>
  );
};

MyAppText.defaultProps = {
  style: null,
}

MyAppText.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default MyAppText
