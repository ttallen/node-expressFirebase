var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var admin = require("firebase-admin");

var serviceAccount = require("./project-147df-firebase-adminsdk-bg97v-327f48e27d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-147df.firebaseio.com"
});

var fireData = admin.database();

app.engine('ejs',engine);
app.set('views','./views');
app.set('view engine','ejs');
//增加靜態檔案的路徑
app.use(express.static('public'))

// 增加 body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//路由
app.get('/',function(req,res){
   fireData.ref('todos').once('value',function(snapshot){
      var data = snapshot.val();
      res.render('index',{"todolist":data});
  })
});

// 新增邏輯
app.post('/addTodo',function(req,res){
  var content = req.body.content;
  var contentRef = fireData.ref('todos').push();
  contentRef.set({"content":content}).then(function(){
    fireData.ref('todos').once('value',function(snapshot){
      res.send(
        {
          "success": true,
          "result": snapshot.val(),
          "message": "讀取成功!"
        }
      );
    })
  })
})

app.post('/removeTodo',function(req,res){
  var id_ = req.body.id;
  fireData.ref('todos').child(id_).remove().then(function(){
    fireData.ref('todos').once('value',function(snapshot){
      res.send(
        {
          "success": true,
          "result": snapshot.val(),
          "message": "資料刪除成功!"
        }
      )
    })
  })
})

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);