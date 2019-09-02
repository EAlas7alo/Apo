import React from 'react';
import PropTypes from 'prop-types'
import { TextInput, StyleSheet, ViewPropTypes } from 'react-native';

const styles = StyleSheet.create({
  textInputNamed: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 20,
  },
})

const TextInputNamed = ({ style, onChange, name, ...props }) => {
  return (
    <TextInput
      style={[styles.textInputNamed, style]}
      onChangeText={(newValue) => onChange(name, newValue)}
      {...props}
    />

  );
};

TextInputNamed.defaultProps = {
  placeholder: '',
  style: [],
}

TextInputNamed.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  style: ViewPropTypes.style,
}


export default TextInputNamed
