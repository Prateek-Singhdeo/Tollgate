const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();

const tripRouter = require('./routes/trip');
//app
const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, x-auth,x-xsrf-token')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Expose-Headers', 'x-auth')
    next()
  })

//db connnection
mongoose.connect(process.env.DATABASE,{
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex:true
})
.then(() => {console.log('db connected ')})

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//route
app.use('/',tripRouter);


const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
});