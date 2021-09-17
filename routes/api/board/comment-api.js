const path = require('path')
const express = require('express')
const router = express.Router()
const moment = require('moment')
const { pool } = require('../../../modules/mysql-init')

router.delete('/:id', async (req, res, next) => {
	let sql, values
	try {	
		sql = " UPDATE comments SET status = '0', removeAt=? WHERE id= " + req.params.id
		values = [moment().format('YYYY-MM-DD HH:mm:ss')]
		await pool.execute(sql, values)
		res.status(200).json({code: 200, reult: 'OK'})
	}
	catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router