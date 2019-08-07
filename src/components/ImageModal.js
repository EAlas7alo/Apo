import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { TouchableHighlight, Image, Dimensions } from 'react-native';

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

const ImageModal = ({ visible, setVisible, image }) => {
  console.log('imageUri at ImageModal: ', image)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  useEffect(() => {
    if (image === null) return
    Image.getSize(image, (width, height) => {
      const maxHeight = Dimensions.get('screen').height
      const maxWidth = Dimensions.get('screen').width
      console.log(`max height and width ${maxHeight} ${maxWidth}`)

      const ratio = Math.min(maxWidth / width, maxHeight / height)

      console.log(width, height)
      setDimensions({ width: width * ratio, height: height * ratio })
    })
  }, [image])

  console.log('image dimensions: ', dimensions)

  return ( 
    <StyledModal
      animationType="fade"
      visible={visible}
    >
      <WrapperView>
        <ImageView transparent={false}>
          <TouchableHighlight onPress={() => setVisible(false)}>
            <StyledImage
              source={{ uri: image }}
              dimensions={dimensions}
              resizeMode="cover"
            />
          </TouchableHighlight>
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
  setVisible: PropTypes.func.isRequired,
  image: PropTypes.string,
}

export default ImageModal
