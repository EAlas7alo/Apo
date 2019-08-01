import React, { useState, useEffect } from 'react';
import { View, FlatList, Image } from 'react-native'
import { PropTypes } from 'prop-types'
import findImagesByEntry from '../logic/findImagesByEntry'

const ImageList = ({ id }) => {
  const [images, setImages] = useState([])
  console.log('images from imagelist', images)
  useEffect(() => {
    findImagesByEntry(id)
      .then(images => {
        setImages(images)
      })
  }, [])
  const data = [
    {
      key: 1,
      image: '../assets/images/bernierune.jpg',
    },
    {
      key: 2,
      image: '../assets/images/bernierune.jpg',
    },
    {
      key: 3,
      image: '../assets/images/bernierune.jpg',
    },
    {
      key: 4,
      image: '../assets/images/bernierune.jpg',
    },
    {
      key: 5,
      image: '../assets/images/bernierune.jpg',
    },
  ]

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
  images: PropTypes.arrayOf(PropTypes.string)
}

export default ImageList
