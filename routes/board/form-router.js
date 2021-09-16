const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const {relPath, isImg} = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/', (req, res, next) => {
	req.app.locals.PAGE = 'CREATE'
	const css = 'board/write'
	const js = 'board/write'
	res.render('board/write', {css, js})
})

router.get('/:id', async (req,res,next) => {
	req.app.locals.PAGE = 'UPDATE'
	let sql, values
	try {
		// sql = " SELECT * FROM board WHERE id= " + req.params.id 
		sql = `
		SELECT B.*, F.realName AS ori, F.saveName AS save
		FROM board B LEFT JOIN files F
		ON B.id = F.fid AND F.status = '1'
		WHERE B.status = '1' AND B.id = ? 
		`
		values = [req.params.id]
		const [[post]] = await pool.execute(sql, values)
		const css = 'board/update'
		const js = 'board/update'
		res.render('board/update', {css, js, post, relPath, isImg})
	}
	catch (err) {
		next(createError(err))
	}
})
module.exports = router