import React from 'react';
import PropTypes from 'prop-types'
import { TextInput } from 'react-native';

const TextInputNamed = ({ value, onChange, name, ...props }) => {
  return (
    <TextInput
      value={value}
      onChangeText={(newValue) => onChange(name, newValue)}
      {...props}
    />

  );
};

TextInputNamed.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}


export default TextInputNamed
