import React from 'react';
import { View, FlatList, Image } from 'react-native'

const ImageList = (props) => {
  //const arr = new Array(20).fill(Math.floor(Math.random()))
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
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.key.toString()}
        // eslint-disable-next-line react/jsx-boolean-value
        horizontal={true}
        renderItem={({ item }) => (
          <Image
            // eslint-disable-next-line global-require
            source={require('../assets/images/bernierune.jpg')}
            style={{ width: 50, height: 50 }}
          />
        )}
      />
    </View>
  );
};

export default ImageList
