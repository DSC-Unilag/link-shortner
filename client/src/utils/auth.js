import axios from 'axios'

export const createUser = async ({name, email, password}) => {
  let data = axios.post('/auth/create', {name, email, password})
  return (await data).data
}

export const getToken = async ({email, password}) => {
  let data = axios.post('/auth/signin', {email, password})
  return (await data).data
}