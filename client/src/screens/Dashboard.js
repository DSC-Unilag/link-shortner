import React from 'react'
import { useHistory } from "react-router-dom"
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const history = useHistory()
  !localStorage.getItem('token') && history.push('/')

  return (
    <div>
      <Navbar /> <br /><hr />
      Dashboard page <br /> <hr />
      <button>New URL</button>
      <form action="">
        <div>
          <label htmlFor="title">Title</label>
        </div>
      </form>
    </div>
  )
}

export default Dashboard
