const collection = require('./models')

const createLink = async (identifier, url) => {
  try {
    const newLink = await collection.create({identifier, url})
    newLink.save()
    return newLink
  } catch {
    return
  }
}

const editLink = async (identifier, url) => {
  const link = await collection.findOne({identifier})
  if (!link) return
  if (url) {
    link.url = url
  }
  link.save()
  return link
}

const deleteLink = async identifier => {
  try {
    await collection.deleteOne({identifier})
  } catch {

  }
  return 
}

const getLink = async identifier => {
  let link = await collection.findOne({identifier})
  if (!link) return
  return link.url
} 

module.exports = {
  createLink, editLink, deleteLink, getLink
}