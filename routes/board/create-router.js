const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-mw')

router.post('/', uploader.single('upfile') ,async (req, res, next) => {
	let sql, values
	try {
		const {title, writer, content} = req.body
		if(title.trim() && writer.trim()) {
			sql = "INSERT INTO board SET title=?, writer=?, content=?"
			values = [title, writer, content]
			const [rs] = await pool.execute(sql, values)
			if(req.file) {
				const {originalname, filename, mimetype, size} = req.file
				sql = " INSERT INTO files SET fid=?, realName=?, saveName=?, mimetype=?, size=?"
				values = [rs.insertId, originalname, filename, mimetype, size]
				await pool.execute(sql, values)
			}
			res.redirect(`/${req.lang}/board/list`)
		}
		else {
			next(createError(400, '제목 또는 작성자를 입력해주세요.'))
		}
	}
	catch(err) {
		next(createError(err))
	} 
})


module.exports = router