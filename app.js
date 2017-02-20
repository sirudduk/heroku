var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine','pug');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req,res) {
    res.send('hello')
})



app.listen(port, function(){
    console.log('Connected 3000 port !')
});
