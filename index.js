const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoute')
const productModifyRoutes = require('./routes/productModifyRoute')
const productRoutes = require('./routes/productRoute')
const locationRoues = require('./routes/locationRoute')
const categoryRoutes = require('./routes/categoryRoute')
const itemRoutes = require('./routes/itemRoute')
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

app.use('/api/auth',authRoutes);
app.use('/api',productModifyRoutes);
app.use('/api',productRoutes);
app.use('/api',locationRoues);
app.use('/api',categoryRoutes);
app.use('/api',itemRoutes)


app.listen(process.env.PORT, async() => {
    console.log(`Started at port: ${process.env.PORT}`)
})