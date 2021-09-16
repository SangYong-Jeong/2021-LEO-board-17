const path = require('path')
const express = require('express')
const router = express.Router()
const moment = require('moment')
const {moveFile} = require('../../modules/util') 
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')

router.delete('/:id', async (req, res, next) => {
	let sql, values
	try {
		sql = " UPDATE board SET status = '0', removeAt=? WHERE id= "+ req.params.id
		values = [moment().format('YYYY-MM-DD HH:mm:ss')]
		await pool.execute(sql, values)
		sql = `
			SELECT B.*, F.id AS fileId, F.saveName 
			FROM board B LEFT JOIN files F
			ON B.id = F.fid AND F.status = '1'
			WHERE B.id=?
		`
		values = [req.params.id]
		const [[rs]] = await pool.execute(sql, values)
		if(rs.fileId) {
			sql = " UPDATE files SET status = '0', removeAt=? WHERE fid=  "+ req.params.id
			values = [moment().format('YYYY-MM-DD HH:mm:ss')]
			await pool.execute(sql, values)
			moveFile(rs.saveName)
		}
		res.redirect(`/${req.lang}/board/list`)
	}
	catch (err) {
		next(createError(err))
	}
})

module.exports = router