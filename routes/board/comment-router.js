const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')

router.post('/:id', (req, res, next) => {
	res.send('hi')
})

module.exports = router