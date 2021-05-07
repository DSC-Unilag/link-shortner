const {ShortLink} = require('./models')

const createLink = async (identifier, url, user) => {
  try {
    const newLink = await ShortLink.create({identifier, url, user})
    newLink.save()
    return newLink
  } catch {
    return
  }
}

const editLink = async (identifier, url, userId) => {
  const link = await ShortLink.findOne({identifier})
  if (!link) return
  console.log(link.user !== userId)
  if (link.user.toString() !== userId) return "Unauthorized"
  if (url) {
    link.url = url
  }
  link.save()
  return link
}

const deleteLink = async (identifier, userId) => {
  const link = await ShortLink.findOne({identifier})
  if (!link) return
  try {
    if (link.user.toString() !== userId) return "Unauthorized"
    await ShortLink.deleteOne({identifier})
  } catch {

  }
  return 
}

const getLink = async (identifier, userId) => {
  let link = await ShortLink.findOne({identifier})
  if (!link) return
  return link.url
} 

const getLinks = async ( user ) => {
  let link = await ShortLink.find({user})
  return link
}

module.exports = {
  createLink, editLink, deleteLink, getLink, getLinks
}