import styled from 'styled-components'

const Container = styled.View`
  background-color: dimgray
  flex: 1
`

const ApoText = styled.Text`
  color: white
  font-size: 15
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

const Header = styled.Text`
  font-size: 15
  font-weight: bold
  color: white
  padding-left: 15px
  padding-bottom: 10px
  padding-top: 10px
`

export { Container, ButtonText, Button, Header, ApoText }
