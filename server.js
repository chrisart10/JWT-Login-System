const express  = require('express')
const cookieParser = require('cookie-parser');
const requireAuth = require('./middleware/auth');
const authRouter  = require('./routes/routers');
require('dotenv').config();


const app  = express()
// template engine

app.set('view engine','ejs');
app.listen(3000)

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.get('/content',requireAuth,(req,res) => {
    res.render('content.ejs');
})

app.use(authRouter);
app.get('/',requireAuth,(req,res) => {
    res.render('index.ejs',{name:req.cookies.name,variable:process.env.SALUDO});
})