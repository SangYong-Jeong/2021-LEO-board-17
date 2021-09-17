const path = require('path')
const express = require('express')
const router = express.Router()
const moment = require('moment')
const createError = require('http-errors')
const createPager = require('../../modules/pager-init')
const {isImg, relPath} = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get(['/:id' , '/:id/:page'], async (req, res, next) => {
	req.app.locals.PAGE = 'VIEW' 
	let sql, values
	const id = req.params.id
	try {
		sql = " SELECT viewCount FROM board WHERE status > '0' AND id = " + req.params.id
		const [[rs]] = await pool.execute(sql)
		sql = " UPDATE board SET viewCount=? WHERE id=?"
		values = [rs['viewCount'] + 1, req.params.id]
		await pool.execute(sql, values)
		// sql = " SELECT * FROM board WHERE status > '0' AND id= " + req.params.id
		sql = `
		SELECT B.*, F.realName AS ori, F.saveName AS save
		FROM board B LEFT JOIN files F
		ON B.id = F.fid AND F.status = '1'
		WHERE B.status = '1' AND B.id = ? 
		`
		values = [req.params.id]
		const [[post]] = await pool.execute(sql, values)

		
		sql = "SELECT COUNT(id) FROM comments WHERE status > '0' AND fid =" +req.params.id
		const [[cnt]] = await pool.execute(sql)
		const totalRecord = cnt['COUNT(id)']
		const page = Number(req.params.page) || 1
		const pager = createPager(page, totalRecord, 3, 3)

		sql = "SELECT id, writer, comment, createAt FROM comments WHERE status = '1' AND fid=? ORDER BY id DESC LIMIT ?,?" 
		values = [req.params.id, pager.startIdx.toString(), pager.listCnt.toString()]
		const [comments] = await pool.execute(sql, values)
		
		comments.forEach(v=> v.createAt = moment(v.createAt).format('YY-MM-DD HH:mm:ss'))
		post.createAt = moment(post.createAt).format('YYYY-MM-DD HH:mm:ss')
		const css ='board/view'
		const js ='board/view'
		res.render('board/view', {css, js, post, comments, pager, id, isImg, relPath})
	}
	catch (err) {
		next(createError(err))
	}
})

module.exports = router