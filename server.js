const express = require('express');

//handlebars: hbs
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');



app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log.');
        }
    });
    next(); 
});

//maintaince page
//app.use((req, res, next)=>{
//    res.render('maintaince.hbs');
//});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', ()=>{
   return  new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
   return text.toUpperCase(); 
});

app.get('/', (req, res)=>{
    //res.send('<h1>Hello Express!</h1>');
//    res.send({
//        name: 'Andrew',
//        likes: [
//            'Biking',
//            'Dota'
//        ]
//    });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        
        welcomeMsg: 'Welcome home'
    });
});

app.get('/about', (req, res)=>{
    //res.send('About Page');
    //pass the dynamic data
    res.render('about.hbs', {
        pageTitle: 'About Page',
       
        
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        errormsg: 'Unable to handle request'
    });
});

app.listen(3000);

