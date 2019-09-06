import styled from 'styled-components'

const Container = styled.View`
  background-color: dimgray
  flex: 1
`

const ButtonText = styled.Text`
  color: white
  font-size: 15
  padding-left: 15px
  padding-right: 15px
`

const Button = styled.TouchableOpacity`
  border-width: 1px
  border-color: white
  margin-right: 15px
  margin-left: auto
  background-color: dimgray
`

export { Container, ButtonText, Button }
