var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine','pug');
app.set('views', './views');
app.use(express.static('public'));


app.get('/main',function(req,res) {
    res.render('main');
});

app.get('/todoapp',function(req,res) {
    res.send('public/todoapp/index.html');
});

app.get('/tetris',function(req,res) {
    res.send('public/teris/index.html');
});
app.get('/poco',function(req,res) {
    res.render('pocopay');
});
app.get('/arbuzz',function(req,res) {
    res.render('arbuzz');
});
app.get('/gallery',function(req,res) {
    res.send('public/gallery/index.html');
});

app.listen(port, function(){
    console.log('Connected 3000 port !')
});
