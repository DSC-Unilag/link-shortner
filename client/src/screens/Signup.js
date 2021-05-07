import React from 'react'
import { useHistory } from "react-router-dom"

const Signup = () => {
  const history = useHistory()
  localStorage.getItem('token') && history.push('/dashboard')
  return (
    <div>
      Signup Page
    </div>
  )
}

export default Signup
