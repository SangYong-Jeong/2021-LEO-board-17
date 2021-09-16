const path = require('path')
const express = require('express')
const router = express.Router()
const moment = require('moment')
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')

router.delete('/:id', async (req, res, next) => {
	let sql, values
	try {
		sql = " UPDATE board SET status = '0', removeAt=? WHERE id= "+ req.params.id
		values = [moment().format('YYYY-MM-DD HH:mm:ss')]
		await pool.execute(sql, values)
		res.redirect(`/${req.lang}/board/list`)
	}
	catch (err) {
		next(createError(err))
	}
})

module.exports = router