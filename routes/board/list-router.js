const path = require('path')
const express = require('express')
const router = express.Router()
const createPager = require('../../modules/pager-init')
const createError = require('http-errors')
const moment = require('moment')
const { pool } = require('../../modules/mysql-init')

router.get(['/', '/:page'], async (req, res, next) => {
	req.app.locals.PAGE = 'LIST'
	let sql, values
	try {
		sql = " SELECT COUNT(id) FROM board WHERE status > '0' "
		const [[cnt]] = await pool.execute(sql)
		const totalRecord = cnt['COUNT(id)']
		const page = Number(req.params.page) || 1
		const pager = createPager(page, totalRecord, 5, 3)

		sql = `SELECT * FROM board WHERE status > '0' ORDER BY id DESC LIMIT ?,? `
		values = [pager.startIdx.toString(), pager.listCnt.toString()]
		const [posts] = await pool.execute(sql, values)
		posts.forEach(v=>{
			v.createAt = moment(v.createAt).format('YYYY-MM-DD HH:mm:ss')
		})

		var number = totalRecord
		for(var i = 1; i <= page; i++) {
			if(i !== 1) number = number - pager.listCnt
		}
		const css = 'board/list'
		const js = 'board/list'
		res.render('board/list', {css, js, posts, pager, number})
	} catch (err) {
		next(createError(err))
	}

})

module.exports = router