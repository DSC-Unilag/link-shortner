const express = require('express')
const { 
  createLink, 
  getLink,
   editLink, 
   deleteLink 
} = require('../models.helpers')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {SECRET_KEY}  = process.env

const verifyToken = (req, res, next)  => {
  const tokenHeader = req.headers['authorization']
  if (typeof tokenHeader !== 'undefined') {
      const token = tokenHeader.split(' ')[1]
      req.token = token
      next()
  } else {
      res.status(403).json({
          error: 'Unauthorized'
      })
  }
}

router.get('/', async (req, res) => {
  res.json({
    message: "API for DSC UNILAG short link, documentation coming soon..."
  })
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const {user} = await jwt.verify(req.token, SECRET_KEY)

    let {url} = req.body
    let identifier = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
    let data = await createLink(identifier, url, user._id)
    if (!data) {
      let identifier = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
      let data = await createLink(identifier, url)
    }
    res.status(201).json({
      id: data.id,
      identifier: data.identifier,
      url: data.url,
      shortened_url: `${req.hostname}/g/${identifier}`,
      message: "short link created successfully",
      status: "ok"
    })
  } catch (err) {
    res.status(500).json({err})
  }
})

router.get('/g/:slug', async (req, res, next) => {
  let slug = req.params.slug
  let url = await getLink(slug)
  if (!url) res.status(404).json({
    message: "Invalid path",
    status: "bad"
  })
  res.status(308).redirect(url)
})

router.put('/:slug', async (req, res, next) => {
  let {url} = req.body
  try {
    let data = await editLink(req.params.slug, url)
    res.status(201).json({
      id: data.id,
      identifier: data.identifier,
      url: data.url,
      shortened_url: `${req.hostname}/g/${data.identifier}`,
      message: "short link updated successfully",
      status: "ok"
    })
  } catch {
    res.status(500).json({
      message: "Something went wrong",
      status: 'bad'
    })
  }
})

router.delete('/:slug', async (req, res, next) => {
  await deleteLink(req.params.slug)
  res.status(200).json({
    message: "data deleted successfully",
    status: "ok"
  }) 
})

module.exports = router