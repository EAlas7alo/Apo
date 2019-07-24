import React from 'react';
import PropTypes from 'prop-types'
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInputNamed: {
    fontSize: 20,
  },
})

const TextInputNamed = ({ style, value, onChange, name, ...props }) => {
  console.log(value)
  return (
    <TextInput
      style={[styles.textInputNamed, style]}
      value={value}
      onChangeText={(newValue) => onChange(name, newValue)}
      {...props}
    />

  );
};

TextInputNamed.defaultProps = {
  placeholder: '',
}

TextInputNamed.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}


export default TextInputNamed
