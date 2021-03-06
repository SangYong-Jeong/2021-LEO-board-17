const path = require('path')
const express = require('express')
const router = express.Router()
const moment = require('moment')
const { pool } = require('../../../modules/mysql-init')

router.delete(['/:id', '/:id/:update'], async (req, res, next) => {
	let sql, values
	try {
		sql = " UPDATE comments SET status = '0', removeAt=?, "
		sql +=  req.params.update ? " updateAt=? " : "" 
		sql += " WHERE id= " + req.params.id 
		values = [moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')]
		await pool.execute(sql, values)
		res.status(200).json({code: 200, reult: 'OK', update: req.params.update ? 'YES' : 'NO'})
	}
	catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router