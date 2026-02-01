const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoute')
const postRoutes = require('./routes/postRoute')
const passport = require('passport')
const cors = require('cors')

require('dotenv').config()
require('./config/passport')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize())

app.use('/api',authRoutes);
app.use('/api/post',postRoutes)


app.listen(process.env.PORT, async() => {
    console.log(`Started at port: ${process.env.PORT}`)
})