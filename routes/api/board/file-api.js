const path = require('path')
const express = require('express')
const router = express.Router()
const moment = require('moment')
const {moveFile, moveFile2} = require('../../../modules/util')
const { pool } = require('../../../modules/mysql-init')

router.delete(['/:id', '/:id/:number'] , async (req, res, next) => {
	let sql, values
	try {
		if(req.params.number) {
			sql = " UPDATE files2 SET status = '0', removeAt=? WHERE fid = " + req.params.id
			values = [moment().format('YYYY-MM-DD HH:mm:ss')]
			await pool.execute(sql, values)
	
			sql = " SELECT saveName FROM files2 WHERE fid = " + req.params.id
			const [[rs]] = await pool.execute(sql)
			moveFile2(rs.saveName)
			res.status(200).json({code: 200, result: 'success'})
		}
		else {
			sql = " UPDATE files SET status = '0', removeAt=? WHERE fid = " + req.params.id
			values = [moment().format('YYYY-MM-DD HH:mm:ss')]
			await pool.execute(sql, values)
	
			sql = " SELECT saveName FROM files WHERE fid = " + req.params.id
			const [[rs]] = await pool.execute(sql)
			moveFile(rs.saveName)
			res.status(200).json({code: 200, result: 'success'})
		}
	}
	catch(err) {
		res.status(500).json(err)
	}
})

module.exports = router