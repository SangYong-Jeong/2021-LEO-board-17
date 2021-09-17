const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const {alert} = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-mw')

router.post('/', uploader.fields([{name :'upfile'}, {name: 'upfile2'}]) ,async (req, res, next) => {
	let sql, values
	try {
		const {title, writer, content} = req.body
		if(title.trim() && writer.trim()) {
			sql = "INSERT INTO board SET title=?, writer=?, content=?"
			values = [title, writer, content]
			const [rs] = await pool.execute(sql, values)
			const {upfile, upfile2} = req.files
			if(upfile) {
				const {originalname: ori, filename: name, mimetype: type, size: size1} = upfile[0]
				sql = " INSERT INTO files SET fid=?, realName=?, saveName=?, mimetype=?, size=?"
				values = [rs.insertId, ori, name, type, size1]
				await pool.execute(sql, values)
			}
			if(upfile2) {
				const {originalname: ori2, filename: name2, mimetype: type2, size: size2} = upfile2[0]
				sql = " INSERT INTO files2 SET fid=?, realName=?, saveName=?, mimetype=?, size=?"
				values = [rs.insertId, ori2, name2, type2, size2]
				await pool.execute(sql, values)
			}
			res.redirect(`/${req.lang}/board/list`)
		}
		else {
			next(createError(400, req.app.locals.VALIDATION.WRITE))
			// res.send(alert(req.app.locals.VALIDATION.WRITE, '/board/form'))
		}
	}
	catch(err) {
		next(createError(err))
	} 
})


module.exports = router