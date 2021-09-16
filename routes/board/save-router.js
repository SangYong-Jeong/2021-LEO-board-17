const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')

router.post('/', async (req, res, next) => {
	let sql, values
	try {
		const {title, writer, content} = req.body
		sql = "INSERT INTO board SET title=?, writer=?, content=?"
		values = [title, writer, content]
		const [rs] = await pool.execute(sql, values)
		res.redirect('/board/list')
	}
	catch(err) {
		next(createError(err))
	} 
})

router.post('/:id', (req,res,next) => {
	let sql, values
	try {

	}
	catch (err) {
		next(createError(err))
	}
})
module.exports = router