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
  console.log(link)
  console.log(userId)
  console.log(link.user !== userId)
  if (!link) return
  if (link.user !== userId) return 'Unauthorized'
  if (url) {
    link.url = url
  }
  link.save()
  return link
}

const deleteLink = async (identifier, userId) => {
  try {
    if (link.user !== userId) return 'Unauthorized'
    await ShortLink.deleteOne({identifier})
  } catch {

  }
  return 
}

const getLink = async identifier => {
  let link = await ShortLink.findOne({identifier})
  if (!link) return
  return link.url
} 

module.exports = {
  createLink, editLink, deleteLink, getLink
}