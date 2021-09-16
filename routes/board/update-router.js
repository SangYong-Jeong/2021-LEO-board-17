const path = require('path')
const express = require('express')
const router = express.Router()
const uploader = require('../../middlewares/multer-mw')
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')

router.post('/:id', uploader.single('upfile'),async (req,res,next) => {
	let sql, values
	const {title, writer, content} = req.body
	try {
		sql = " UPDATE board SET title =?, writer=?, content=? WHERE id=" + req.params.id
		values = [title, writer, content]
		await pool.execute(sql, values)
		res.redirect(`/${req.lang}/board/list`)
	}
	catch (err) {
		next(createError(err))
	}
})

module.exports = router