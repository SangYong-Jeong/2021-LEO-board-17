const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const {absPath} = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/:id' , async (req, res, next) => {
	let sql, values
	try {
		sql = " SELECT realName, saveName FROM files WHERE status = '1' AND fid= " + req.params.id
		const [[rs]] = await pool.execute(sql)
		res.status(200).download(absPath(rs.saveName), rs.realName)
	}
	catch (err) {
		next(createError(err))
	}
})

module.exports = router