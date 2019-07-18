require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter )


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})