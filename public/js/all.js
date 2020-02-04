var content = document.getElementById('content');
var send = document.getElementById('send');
var list = document.getElementById('list');

send.addEventListener('click',function(e){
    var str = content.value;
    var xhr = new XMLHttpRequest();
    xhr.open('post','/addTodo');
    xhr.setRequestHeader('Content-type','application/json');
    var todo = JSON.stringify({"content":str});
    xhr.send(todo);
    xhr.onload = function(){
        var originData = JSON.parse(xhr.responseText);
        if(originData.success == false){
            alert(originData.message);
            return;
        }
        var data = originData.result;
        var str_ = '';
        for(item in data){
            str_ += '<li>' + data[item].content + '</li>';
        }
        list.innerHTML = str_;
    }
})