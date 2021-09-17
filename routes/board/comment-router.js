const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')

router.post('/:id', async (req, res, next) => {
	let sql, values
	try {
		console.log(req.lang)
		const {writer, comment} = req.body
		if(writer.trim() && comment.trim() ) {
			sql = " INSERT INTO comments SET writer=?, comment=?, fid=? "
			values = [writer, comment, req.params.id]
			await pool.execute(sql, values)
			res.redirect(`/${req.lang}/board/view/${req.params.id}/1`)
		}
		else {
			next(createError(400, '작성자 또는 코멘트 내용을 입력해주세요'))
		}
	}
	catch (err) {
		next(createError(err))
	}
})

module.exports = router