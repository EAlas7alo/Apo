import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, Animated } from 'react-native'
import styled from 'styled-components/native'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { GET_SELECTED_IMAGES } from '../../queries/queries'

const ImageTouchable = styled.TouchableHighlight`

`

const ListImage = styled.Image`

`

const AnimatedListImage = Animated.createAnimatedComponent(ListImage)

const SET_SELECTED_IMAGES = gql`
  mutation setSelectedImages($image: String!) {
    setSelectedImages(image: $image) @client
  }
`

const AttachmentView = (props) => {
  const [highlighted, setHighlighted] = useState(false)
  const animation = useRef(new Animated.Value(0)).current

  const [setSelectedImages] = useMutation(SET_SELECTED_IMAGES, {
    refetchQueries: [{ query: GET_SELECTED_IMAGES }],
  })

  const dimensions = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [75, 85],
  })

  useEffect(() => {
    Animated.timing(animation, {
      toValue: highlighted ? 1 : 0,
      duration: 100,
      // useNativeDriver: true,
    }).start()
  }, [highlighted])

  const setImageAsSelected = () => {
    setSelectedImages({ variables: { image: props.item } })
    setHighlighted(!highlighted)
  }

  return (
    <View>
      <ImageTouchable
        activeOpacity={0.95}
        onPress={() => props.onPress(props.item)}
        onLongPress={setImageAsSelected}
        delayLongPress={150}
        highlighted={highlighted}
      >
        <AnimatedListImage
          source={{ uri: props.item }}
          highlighted={highlighted}
          style={{
            width: dimensions,
            height: dimensions,
          }}
        />
      </ImageTouchable>
    </View>
  )
}

AttachmentView.propTypes = {
  item: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default AttachmentView
