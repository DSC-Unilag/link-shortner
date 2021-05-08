import axios from 'axios'
import {config} from 'dotenv'

config()

export const createUser = async ({name, email, password}) => {
  let data = axios.post(`${process.env.REACT_APP_API_URL}/auth/create`, {name, email, password})
  return (await data).data
}

export const getToken = async ({email, password}) => {
  let data = axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, {email, password})
  return (await data).data
}