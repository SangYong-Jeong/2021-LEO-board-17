const path = require('path')
const express = require('express')
const router = express.Router()
const moment = require('moment')
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')

router.get('/:id', async (req, res, next) => {
	req.app.locals.PAGE = 'VIEW' 
	let sql, values
	try {
		sql = " SELECT viewCount FROM board WHERE status > '0' AND id = " + req.params.id
		const [[rs]] = await pool.execute(sql)
		sql = " UPDATE board SET viewCount=? WHERE id=?"
		values = [rs['viewCount'] + 1, req.params.id]
		await pool.execute(sql, values)
		sql = " SELECT * FROM board WHERE status > '0' AND id= " + req.params.id
		const [[post]] = await pool.execute(sql)
		post.createAt = moment(post.createAt).format('YYYY-MM-DD HH:mm:ss')
		const css ='board/view'
		const js ='board/view'
		res.render('board/view', {css, js, post})
	}
	catch (err) {
		next(createError(err))
	}
})

module.exports = router