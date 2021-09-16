const path = require('path')
const express = require('express')
const router = express.Router()
const { pool } = require('../../modules/mysql-init')

router.get('/', (req, res, next) => {
	req.app.locals.PAGE = 'CREATE'
	const css = 'board/write'
	const js = 'board/write'
	res.render('board/write', {css, js})
})

router.get('/:idx', (req,res,next) => {
	req.app.locals.PAGE = 'UPDATE'
	const css = 'board/update'
	const js = 'board/update'
	res.render('board/update', {css, js})
})
module.exports = router