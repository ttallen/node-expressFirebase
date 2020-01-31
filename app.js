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
fireData.ref('todos').once('value',function(snapshot){
  console.log(snapshot.val());
})

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
   res.render('index');
    
})

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);