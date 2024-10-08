const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');

require('dotenv').config()
const PORT = process.env.PORT || 9000

const mongoose = require('mongoose')
const mongo_url = process.env.MONGO_CONN

mongoose.connect(mongo_url).then(()=>{
    console.log('MongoDB Connected Successfully')
}).catch((err)=>{
    console.log('MongoDB Server Error : ', err)
})

app.get('/test',(req, res)=>{
    res.send('Server is running on port number : 9000')
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})