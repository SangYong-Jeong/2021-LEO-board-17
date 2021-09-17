const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const {absPath, absPath2} = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/:id/:number' , async (req, res, next) => {
	let sql, values
	try {
		if(req.params.number === '1') {
			sql = " SELECT realName, saveName FROM files WHERE status = '1' AND fid= " + req.params.id
			const [[rs]] = await pool.execute(sql)
			res.status(200).download(absPath(rs.saveName), rs.realName)
		}
		else {
			sql = " SELECT realName, saveName FROM files2 WHERE status = '1' AND fid= " + req.params.id
			const [[rs]] = await pool.execute(sql)
			res.status(200).download(absPath2(rs.saveName), rs.realName)
		}
	}
	catch (err) {
		next(createError(err))
	}
})

module.exports = router