import axios from 'axios'
import {config} from 'dotenv'

config()
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
export const getLinks = async token => {
  console.log(REACT_APP_API_URL)
  let data =  axios.get(`${REACT_APP_API_URL}/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return (await data).data
}

export const deleteLink = async (slug, token) => {
  let link =  axios.delete(`${REACT_APP_API_URL}/${slug}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  console.log(await link)
  return (await link).data
}

export const getLink = async (slug, token) => {
  let link =  axios.get(`${REACT_APP_API_URL}/${slug}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return (await link).data
}

export const createLink = async (data, token) => {
  let link =  axios.post(`${REACT_APP_API_URL}/`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return (await link).data
}

export const editLink = async (slug, data, token) => {
  let link =  axios.put(`${REACT_APP_API_URL}/${slug}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return (await link).data
}