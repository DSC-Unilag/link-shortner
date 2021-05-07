import React from 'react'
import { useHistory } from "react-router-dom"
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const history = useHistory()
  !localStorage.getItem('token') && history.push('/')

  return (
    <div>
      <Navbar />
      Dashboard page
    </div>
  )
}

export default Dashboard
