require('dotenv').config();
const jwt = require('jsonwebtoken');

// test for example of credential validation 
const  pass = 'passto123test';
const id = 10;

// controllers
const maxAge = process.env.MAXAGE; // 259200 = 1 day
const securePhrase = process.env.CLAVE;

module.exports.login_get = (req,res)=>{
    console.log(process.env.CLAVE);
    res.render('login.ejs')
}

module.exports.login_post =  (req,res)=>{
    
    if(pass ===  req.body.password){
        console.log(req.body);
        const token = jwt.sign({id},securePhrase,{expiresIn:maxAge});
        res.cookie('name',req.body.name);
        res.cookie('jwt',token,{maxAge : 1000*maxAge,httpOnly:true});
        res.redirect('/');
    }
    else{
        res.redirect('/login');
    }
}

module.exports.register_get  = (req,res)=>{
    res.render('register.ejs')
}
module.exports.register_post = (req,res)=>{
    res.render('register.ejs');
}

module.exports.logout =  (req,res)=>{
    res.cookie('name','',{maxAge:1});
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/login');
}

