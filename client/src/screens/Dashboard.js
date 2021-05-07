import React from 'react'
import { useHistory } from "react-router-dom"

const Dashboard = () => {
  const history = useHistory()
  !localStorage.getItem('token') && history.push('/')
  
  return (
    <div>
      Dashboard page
    </div>
  )
}

export default Dashboard
