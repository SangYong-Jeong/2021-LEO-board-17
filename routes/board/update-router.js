const path = require('path')
const express = require('express')
const router = express.Router()
const uploader = require('../../middlewares/multer-mw')
const createError = require('http-errors')
const { moveFile } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.post('/:id', uploader.single('upfile'),async (req,res,next) => {
	let sql, values
	try {
		const {title, writer, content} = req.body
		if(title.trim() && writer.trim()) {
			// 내용 업뎃
			sql = " UPDATE board SET title =?, writer=?, content=? WHERE id=" + req.params.id
			values = [title, writer, content]
			await pool.execute(sql, values)
			// 파일 없데이트
			if(req.file) {
				const {originalname, filename, mimetype, size} = req.file
				sql = `
				SELECT B.*, F.id AS fileId, F.saveName AS save
				FROM board B LEFT JOIN files F
				ON B.id = F.fid AND F.status = '1'
				WHERE B.id =? AND B.status = '1'
				`
				values = [req.params.id]
				const [[rs]] = await pool.execute(sql, values)
				if(rs.fileId) {
					sql = " UPDATE files SET status = '0' WHERE id= " + rs.fileId
					await pool.execute(sql)
				}
				sql = " INSERT INTO files SET fid=?, realName=?, saveName=?, mimetype=?, size=?  "
				values = [req.params.id ,originalname, filename, mimetype, size]
				await pool.execute(sql, values)
				res.redirect(`/${req.lang}/board/list`)
			}
			else {
				res.redirect(`/${req.lang}/board/list`)
			}
		}
		else {
			next(createError(400, '제목 또는 작성자를 입력해주세요.'))
		}
	}
	catch (err) {
		next(createError(err))
	}
})

module.exports = router