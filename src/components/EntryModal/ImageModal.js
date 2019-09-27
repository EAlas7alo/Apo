import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { TouchableWithoutFeedback, Image, Dimensions, Animated } from 'react-native';
import MyAppText from '../TextComponents/MyAppText';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StyledModal = styled.Modal`
  flex: 1
  justify-content: center
  border-color: red
  border-width: 4px
`
const WrapperView = styled.View`
  flex: 1
  justify-content: center
  backgroundColor: black;
`
const ImageView = styled.View`
  justify-content: center
  background-color: snow
`
const StyledImage = styled.Image`
  width: ${props => props.dimensions.width}
  height: ${props => props.dimensions.height}
`

const MenuView = styled.TouchableOpacity`
  position: absolute
  width: ${props => props.dimensions.width}
  height: 100px
  top: ${props => props.top}
  background-color: rgba(0,0,0,.5)
  z-index: 1
  justify-content: center
  align-items: center
`

const AnimatedMenuView = Animated.createAnimatedComponent(MenuView)

const MenuText = styled(MyAppText)`
  
`

const ImageModal = ({ visible, setVisible, image, onRequestClose }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [menuVisible, setMenuVisible] = useState(true)
  const animation = useRef(new Animated.Value(0)).current
  console.log(visible)
  const menuTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  })

  useEffect(() => {
    Animated.timing(animation, {
      toValue: menuVisible ? 0 : 1,
      duration: 100,
    }).start()
  }, [menuVisible])

  useEffect(() => {
    if (visible) setMenuVisible(true)
  }, [visible])

  useEffect(() => {
    if (image === null) return
    Image.getSize(image, (width, height) => {
      const maxHeight = Dimensions.get('screen').height
      const maxWidth = Dimensions.get('screen').width

      const ratio = Math.min(maxWidth / width, maxHeight / height)

      setDimensions({ width: width * ratio, height: height * ratio })
    })
  }, [image])

  const handleClose = () => {
    console.log('xd')
    setVisible()
  }

  return (
    <StyledModal
      animationType="fade"
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <WrapperView>
        <AnimatedMenuView onPress={handleClose} top={menuTop} dimensions={dimensions}>
          <MenuText text="Press back or tap here to close" />
        </AnimatedMenuView>
        <ImageView transparent={false}>
          <TouchableWithoutFeedback onPress={() => setMenuVisible(!menuVisible)}>
            <StyledImage
              source={{ uri: image }}
              dimensions={dimensions}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>
        </ImageView>
      </WrapperView>
    </StyledModal>

  )
}

ImageModal.defaultProps = {
  image: null,
  visible: false,
}

ImageModal.propTypes = {
  visible: PropTypes.bool,
  image: PropTypes.string,
  setVisible: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default ImageModal
