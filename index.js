const socket= require('socket.io');
const http=require('http');
const express=require('express');
const path=require("path");
const app= express();
app.use(express.static(path.join(__dirname,"/public")))
app.get('/',(req,res)=>{
    res.send(path.join(__dirname,"/public","/index.html"))
})
const users=[]
const server=http.createServer(app)
const io=socket(server,{cors:{origin:'*'}})

io.on('connection',(socket)=>{
 console.log("userjoin");
socket.on('new-user-connected',naame=>{
    users.push({id:socket.id,user:naame})
    socket.broadcast.emit("user-list",users)
    socket.emit("user-list",users)
});
socket.on('message_post',(text,naame)=>{
    socket.broadcast.emit('message_rec',text,naame)
    console.log(naame)
})
socket.on('disconnect',(reason)=>
{for(let x in users)
{if(users[x].id===socket.id)
{users.splice(x,1)
socket.broadcast.emit("user-list",users)
break;
}
}
})
})
server.listen(8000,()=>{console.log('listening')})