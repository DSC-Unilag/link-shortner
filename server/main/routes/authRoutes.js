const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

const {SECRET_KEY} = process.env


// auth - signup & login
router.post('/create', async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password ,10)
    let user = await User.create(req.body)
    user = user.toObject()
    delete user.password
    res.status(201).json({
      data: user,
      message: 'User created successfully',
      status: 'ok'
    })
  } catch (error) {
    res.status(400).json({error})
  }
})

router.post('/signin', async (req, res, next) => {
  try {
    const {email, password} = req.body
    let user = await User.findOne({email})
    if (user) {
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        const token = await jwt.sign({user}, SECRET_KEY)
        res.status(200).json({
          data: {token, user},
          message: 'successfully retrieved token for user',
          status: 'ok'
        })
      } else {
        res.status(400).json({error: 'Invalid email or password'})
      }
    } else { 
      res.status(400).json({
        error: 'Invalid email or password'
      })
    }
  } catch (error) {
    res.status(400).json({error})
  }
})


module.exports = router;
