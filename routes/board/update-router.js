const path = require('path')
const express = require('express')
const router = express.Router()
const uploader = require('../../middlewares/multer-mw')
const createError = require('http-errors')
const moment = require('moment')
const { moveFile, moveFile2 } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.post('/:id', uploader.fields([{name : 'upfile'}, {name : 'upfile2'}] ),async (req,res,next) => {
	let sql, values
	try {
		const {title, writer, content} = req.body
		if(title.trim() && writer.trim()) {
			// 내용 업뎃
			sql = " UPDATE board SET title =?, writer=?, content=?, updateAt=? WHERE id=" + req.params.id
			values = [title, writer, content, moment().format('YYYY-MM-DD HH:mm:ss')]
			await pool.execute(sql, values)
			// 파일 업데이트
			const {upfile, upfile2} = req.files
			if(upfile || upfile2) {
				sql = `
				SELECT B.*, F.id AS fileId, F.saveName AS save, F2.id AS fileId2, F2.saveName AS save2
				FROM board B LEFT JOIN files F
				ON B.id = F.fid AND F.status = '1'
				LEFT JOIN files2 F2
				ON B.id = F2.fid AND F.status = '1'
				WHERE B.id =? AND B.status = '1'
				`
				values = [req.params.id]
				const [[rs]] = await pool.execute(sql, values)
				if(upfile) {
					const {originalname: ori1, filename: name1, mimetype: type1, size : size1} = upfile[0]
					if(rs.fileId) {
						const removeDate = moment().format('YYYY-MM-DD HH:mm:ss')
						sql = " UPDATE files SET status = '0', removeAt=? WHERE id= " + rs.fileId
						values = [removeDate]
						await pool.execute(sql, values)
						moveFile(rs.save)
					}
					sql = " INSERT INTO files SET fid=?, realName=?, saveName=?, mimetype=?, size=?  "
					values = [req.params.id , ori1, name1, type1, size1]
					await pool.execute(sql, values)
				}
				if(upfile2) {
					const {originalname: ori2, filename: name2, mimetype: type2, size: size2} = upfile2[0]
					if(rs.fileId2) {
						const removeDate2 = moment().format('YYYY-MM-DD HH:mm:ss')
						sql = " UPDATE files2 SET status = '0', removeAt=? WHERE id= " + rs.fileId2
						values = [removeDate2]
						await pool.execute(sql, values)
						moveFile2(rs.save2)
					}
					sql = " INSERT INTO files2 SET fid=?, realName=?, saveName=?, mimetype=?, size=?  "
					values = [req.params.id ,ori2, name2, type2, size2]
					await pool.execute(sql, values)
				}
				res.redirect(`/${req.lang}/board/list`)
			}
			else {
				res.redirect(`/${req.lang}/board/list`)
			}
		}
		else {
			next(createError(400, req.app.locals.VALIDATION.WRITE))
		}
	}
	catch (err) {
		next(createError(err))
	}
})

module.exports = router