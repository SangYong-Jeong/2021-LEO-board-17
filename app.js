/*************** global init **************/
require('dotenv').config()
const port = process.env.PORT
const path = require('path')
const express = require('express')
const app = express()
const methodOverride = require('./modules/method-init')

/*************** server init **************/
require('./modules/server-init')(app, process.env.PORT)


/************** view engine ***************/
app.set('view engine', 'ejs')
app.set('views', './views')
app.locals.pretty = true


/*************** middleware ***************/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride())

/*************** static init **************/
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'storages')))

/*************** router init **************/
const langMW = require('./middlewares/lang-mw')
const boardRouter = require('./routes/board')
const apiBoardRouter = require('./routes/api/board')

app.use(langMW)
app.use('/board', boardRouter)
app.use('/board/api', apiBoardRouter)

/**************** error init **************/
const _404Router = require('./routes/error/404-router')
const _500Router = require('./routes/error/500-router')

app.use(_404Router)
app.use(_500Router)

