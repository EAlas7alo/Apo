import React from 'react';
import { View, FlatList, Image } from 'react-native'
import { PropTypes } from 'prop-types'

const ImageList = ({ images }) => {
  return (
    <View>
      {images.length > 0 && (
      <FlatList
        data={images}
        keyExtractor={(item, index) => item}
        horizontal
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: 50, height: 50 }}
          />
        )}
      />
      )}
    </View>
  );
};

ImageList.defaultProps = {
  images: null,
}

ImageList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
}

export default ImageList
