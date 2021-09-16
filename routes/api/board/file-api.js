const path = require('path')
const express = require('express')
const router = express.Router()
const { pool } = require('../../../modules/mysql-init')

router.delete('/:id' , async (req, res, next) => {
	try {
		res.status(200).send('hi')
	}
	catch(err) {
		res.status(500).json(err)
	}
})

module.exports = router