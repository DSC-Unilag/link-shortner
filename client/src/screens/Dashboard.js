import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const history = useHistory()
  !localStorage.getItem('token') && history.push('/')
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    setData([
      {
        id: 1,
        title: 'App',
        link: 'https://google.com',
        shortened_url: 'app/g/'
      },
      {
        id: 2,
        title: 'App',
        link: 'https://google.com',
        shortened_url: 'app/g/'
      }
    ])
    return () => {
      'cleanup'
    }
  }, [])
  const handleClick = e => {
    e.preventDefault()
    console.log(e.target.title.value)
    console.log(e.target.link.value)
    if (e.target.name.value && e.target.link.value) {
      setData([
        {
          id: data.length+1,
          title: e.target.title.value,
          link: e.target.link.value,
          shortened_url: '/gg/gg/'
        },
        ...data
      ])
      setClicked(false)
    }
  }
  return (
    <div>
      <Navbar /> <br /><hr />
      Dashboard page <br /> <hr />
      {
      !clicked ? 
      <button onClick={() => {setClicked(true)}}>New URL</button> :
      <form onSubmit={handleClick}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text"  name="title" />
        </div>

        <div>
          <label htmlFor="link">Link</label>
          <input type="url"  name="link" />
        </div>

        <button>Create</button>
      </form>
      
      } <br /> <hr />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Link</th>
            <th>Shortened URL</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map(ele => {
            return <Link 
                      key={ele.id} 
                      ele={ele}
                      handleDelete={() => {
                        setData(data.filter(d => d.id !== ele.id))
                      }} 
                      handleEdit ={() =>{
                        setClicked(true)
                      }}
                    />
          })}
        </tbody>
      </table>
    </div>
  )
}

const Link = ({ele, handleDelete, handleEdit}) => {
  return (
    <tr>
      <td>{ele.title}</td>
      <td>{ele.link}</td>
      <td>{ele.shortened_url}</td>
      <td><button onClick={handleEdit}>Edit</button></td>
      <td><button onClick={handleDelete}>Delete</button></td>
    </tr>
  )
}

export default Dashboard
