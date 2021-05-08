import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Navbar from '../components/Navbar'
import { createLink, getLinks } from '../utils/links'

const Dashboard = () => {
  const history = useHistory()
  !localStorage.getItem('token') && history.push('/')
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      let res = await getLinks(localStorage.getItem('token'))
      console.log(res)
      setData(res.data)
    }
    fetchData()
    return () => {
      'cleanup'
    }
  }, [])
  const handleClick = async e => {
    e.preventDefault()
    console.log(e.target.title.value)
    console.log(e.target.link.value)
    console.log('Submit')
    if (true) {
      console.log('Validated')
      let newLink = (await createLink(
        {title: e.target.title.value, url: e.target.link.value}, 
        localStorage.getItem('token')
      )).data
      console.log(newLink)
      setData([
        {
          id: newLink.id,
          title: newLink.title,
          link: newLink.url,
          shortened_url: newLink.shortened_url
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
                      key={ele._id} 
                      ele={ele}
                      handleDelete={() => {
                        setData(data.filter(d => d._id !== ele._id))
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
      <td>{ele.url}</td>
      <td>{ele.shortened_url}</td>
      <td><button onClick={handleEdit}>Edit</button></td>
      <td><button onClick={handleDelete}>Delete</button></td>
    </tr>
  )
}

export default Dashboard
