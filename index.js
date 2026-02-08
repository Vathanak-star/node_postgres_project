const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoute')
const postRoutes = require('./routes/postRoute')
const productRoutes = require('./routes/productRoute')
const locationRoues = require('./routes/locationRoute')
const passport = require('passport')
const cors = require('cors')

require('dotenv').config()
require('./config/passport')

const app = express()
app.use(express.json())
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize())

app.use('/api',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api',productRoutes)
app.use('/api',locationRoues);


app.listen(process.env.PORT, async() => {
    console.log(`Started at port: ${process.env.PORT}`)
})