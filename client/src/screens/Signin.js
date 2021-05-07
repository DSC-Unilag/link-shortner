import React from 'react'
import { useHistory } from "react-router-dom"

const Signin = () => {
  const history = useHistory()
  localStorage.getItem('token') && history.push('/dashboard')
  return (
    <div>
      Signin Page
    </div>
  )
}

export default Signin
