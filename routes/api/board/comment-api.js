const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('../../../modules/util')
const { pool } = require('../../../modules/mysql-init')

router.delete('/:id', async (req, res, next) => {
	let sql, values
	try {	
		sql = " UPDATE comments SET status = '0' WHERE id= " + req.params.id
		await pool.execute(sql)
		res.status(200).json({code: 200, reult: 'OK'})
	}
	catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router