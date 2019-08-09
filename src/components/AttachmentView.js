import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, Animated } from 'react-native'
import styled from 'styled-components/native'
import Ionicons from 'react-native-vector-icons/Ionicons'


const CloseButtonTouchable = styled.TouchableHighlight`
  border-radius: 50
  position: absolute
  top: 0px
  right: 0px
  background-color: white
`

const ImageTouchable = styled.TouchableHighlight`

`

const ListImage = styled.Image`

`

const AnimatedListImage = Animated.createAnimatedComponent(ListImage)

const AttachmentView = (props) => {

  const [highlighted, setHighlighted] = useState(false)
  const animation = useRef(new Animated.Value(0)).current

  const dimensions = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [75, 85],
  })

  useEffect(() => {
    Animated.timing(animation, {
      toValue: highlighted ? 1 : 0,
      duration: 300,
      // useNativeDriver: true,
    }).start()
  }, [highlighted])

  return (
    <View>
      <ImageTouchable
        activeOpacity={0.95}
        onPress={() => props.onPress(props.item)}
        onLongPress={() => setHighlighted(!highlighted)}
        highlighted={highlighted}
      >
        <AnimatedListImage
          source={{ uri: props.item}}
          highlighted={highlighted}
          style={{
            width: dimensions,
            height: dimensions,
          }}
        />
      </ImageTouchable>
      {highlighted && (
        <CloseButtonTouchable>
          <Ionicons name="md-close" size={15} />
        </CloseButtonTouchable>
      )}
    </View>
  )
}

AttachmentView.propTypes = {
  item: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default AttachmentView
