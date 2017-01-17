var express = require('express');
var app = express();
// bodyparser 모듈 붙이기
var bodyParser = require('body-parser');
// jade 파일 이쁘게하기
app.locals.pretty = true;
// 템플릿 엔진 제이드 사용법.
app.set('view engine','pug');

// 기본 설정
app.set('views', './views');
// 정적인 파일 서비스하는법
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));
app.get('/form',function(req,res){
    res.render('form');
});

app.get('/form_receiver',function(req,res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
});

app.post('/form_receiver',function(req,res){
    title = req.body.title;
    description = req.body.description;
    res.send(title+description);
});

// query string 
app.get('/topic/:id', function(req,res){
    var topics = [
        'javascript is....',
        'Nodejs is ....',
        'express is ....'
    ];
    var output = `
    <a href="/topic/0">Javascript</a><br>
    <a href="/topic/1">nodejs</a><br>
    <a href="/topic/2">express</a><br><br>
    ${topics[req.params.id]}
    `
    res.send(output);
});
app.get('/topic/:id/:mode',function(req,res){
    res.send(req.params.id+','+req.params.mode)
});


app.get('/template',function(req,res){
    res.render('temp', {time: Date(), sirudduk: 'sirudduk'});
});

app.get('/blank',function(req,res){
    res.send('bbb');
});
app.get('/', function(req,res){
    res.send('index.html');
});
app.get('/login', function(req,res){
    res.send('fffff');
});
app.get('/loding',function(req,res){
    res.send('<h1>login</h1>');
});
app.listen(3000, function(){
    console.log('Connected 3000 port !')
});
