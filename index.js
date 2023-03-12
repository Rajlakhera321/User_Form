require('dotenv').config()
const express = require('express')
const cors = require("cors")
const app = express()
app.use(cors());
app.use(express.json())
const bodyParser = require('body-parser')
const routes = require('./src/router')
const mongoose = require('mongoose')
const http = require('http')
app.use('/api/', routes)
;(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {})
    console.log('Successfully connected database')
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    const server = http.createServer(app)
    const port = process.env.PORT || 8000
    server
      .listen(port)
      .on('listening', () => console.log(`App is starting on port: ${port}`))
      .on('error', (err) =>
        console.log(`An error occured while starting server`, err),
      )
  } catch (error) {
    console.log(error)
    console.log(`An error is happening with DB URL connection string`)
    process.exit(1)
  }
})()