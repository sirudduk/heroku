// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var multer = require('multer');
// var upload = multer({dest: 'uploads/'});
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// var upload = multer({ storage: storage })
// var fs = require('fs');
// var errM = function(){
//     return 
//         if (err) {
//             res.status(500).send('Internal server error');
//         }
// };
// app.set('views','./views_ex');
// app.set('view engine', 'pug');
// app.locals.pretty = true;
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/upload',function(req,res){
//     res.render('upload')
// })
// app.get('/',function(req,res){
//     res.send('hello');
// });
// app.listen(2000, function(){
//     console.log('connected 2000 port!');
// });

// app.get(['/topic/:id','/topic'],function(req,res){
//     fs.readdir('data',function(err,files){
//         errM();
//         var id = req.params.id;
//         if(!id){
//             res.render('view',{topics:files, title: 'wellcome',description: 'programming'});
//         } else if (id=='new'){
//             res.render('new',{topics: files});
//         } else if(id){
//             fs.readFile('data/'+id,'utf-8',function(err, data){
//                 errM();
//             res.render('view', {topics:files, title:id, description: data});
//             })
//         }
//     })
// });
// app.post('/upload',upload.single('userfile'),function(req,res){
//     console.log(req.file);
//     res.send('Uploaded: '+req.file.filename);
// })

// app.post('/topic', function(req,res){
//     var title = req.body.title;
//     var description = req.body.description;
//     fs.writeFile('data/'+title,description, function(err){
//         errM();
//         res.redirect('/topic/'+title);
//     });
    
// });