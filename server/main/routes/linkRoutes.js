const express = require('express')
const { 
  createLink, 
  getLink,
  getLinks,
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

router.get('/docs', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/11853513/TzJx9cWf')
})

router.get('/', verifyToken, async (req, res) => {
  const {user} = await jwt.verify(req.token, SECRET_KEY)
  const links_ = await getLinks(user._id)
  let links = []
  for (let link of links_) {
    links.push({
      _id: link._id,
      identifier: link.identifier,
      url: link.url,
      user: link.user,
      shortened_url: `${req.protocol}://${req.get('host')}/g/${link.identifier}`
    })
  }
  res.json({
    message: ",short links retrieved successfully",
    status: "ok",
    data: links
  })
})

router.get('/:slug', verifyToken, async (req, res) => {
  const {user} = await jwt.verify(req.token, SECRET_KEY)
  let identifier = req.params.slug
  const link = await getLink(identifier, user._id)
  if (!link) {
    return res.status(404).json({
      message: 'No link with that identifier',
      status: "bad"
    })
  }
  if (link === "Unauthorized") {
    return res.status(401).json({
      message: 'Unauthorized',
      status: "bad"
    })
  }
  res.json({
    id: link._id,
    identifier: link.identifier,
    url: link.url,
    shortened_url: `${req.protocol}://${req.get('host')}/g${req.originalUrl}`,
    message: "short link created successfully",
    status: "ok"
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
      data = await createLink(identifier, url)
    }
    res.status(201).json({
      id: data._id,
      identifier: data.identifier,
      url: data.url,
      shortened_url: `${req.protocol + '://' + req.get('host')}g/${identifier}`,
      message: "short link created successfully",
      status: "ok"
    })
  } catch (err) {
    res.status(500).json({err})
  }
})

router.get('/g/:slug', async (req, res) => {
  let slug = req.params.slug
  let url = await getLink(slug)
  if (!url) res.status(404).json({
    message: "Invalid Identifier",
    status: "bad"
  })
  res.status(308).redirect(url)
})

router.put('/:slug', verifyToken, async (req, res) => {
  let {url} = req.body
  const {user} = await jwt.verify(req.token, SECRET_KEY)
  try {
    let data = await editLink(req.params.slug, url, user._id)
    if (!data) {
      return res.status(404).json({
        message: 'No link with that identifier',
        status: "bad"
      })
    }
    if (data === "Unauthorized") {
      return res.status(401).json({
        message: 'Unauthorized',
        status: "bad"
      })
    }
    res.status(201).json({
      id: data.id,
      identifier: data.identifier,
      url: data.url,
      shortened_url: `${req.protocol}://${req.get('host')}/g/${data.identifier}`,
      message: "short link updated successfully",
      status: "ok"
    })
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      status: 'bad',
      error: err.toString()
    })
  }
})

router.delete('/:slug', verifyToken, async (req, res) => {
  const {user} = await jwt.verify(req.token, SECRET_KEY)
  let data = await deleteLink(req.params.slug, user._id)
  if (!data) {
    return res.status(404).json({
      message: 'No link with that identifier',
      status: "bad"
    })
  }
  if (data === "Unauthorized") {
    return res.status(401).json({
      message: 'Unauthorized',
      status: "bad"
    })
  }
  res.status(200).json({
    message: "data deleted successfully",
    status: "ok"
  }) 
})

module.exports = router