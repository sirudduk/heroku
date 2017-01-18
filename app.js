var express = require('express');
var app =  express();
var bodyParser = require('body-parser');
app.locals.pretty = true;

app.set('view engine','pug');
app.set('views','./views');

app.get('/',(req,res)=> {
    res.render('temp');
})


app.use(express.static('public'));

// // app.get('/',(req,res)=> {
// //     res.send('temp.html');
// //     console.log('changed?');
// // })

app.listen(process.env.PORT || 4000, ()=> {
    console.log('Connected 4000 port !!!!');
})
