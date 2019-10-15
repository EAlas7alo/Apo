import gql from 'graphql-tag'

const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password)
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export {
  CREATE_USER,
  LOGIN,
}
