const path = require('path')
const express = require('express')
const router = express.Router()

/*
		/board/api/file 가면 ajax 통신
*/

const fileApiRouter = require('./file-api')

router.use('/file', fileApiRouter)

module.exports = router