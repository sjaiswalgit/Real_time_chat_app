const socket = io();
const members=document.getElementsByClassName("participants")[0];
const form =document.getElementById("fm");
const messagesIO=document.getElementsByClassName("messages")[0];
const naame=prompt("Enter your name");
socket.emit("new-user-connected",naame);
socket.on("user-list",(users)=>{
    members.innerHTML="<h2>Participants</h2>"
    users.forEach((e)=>{
        const member=document.createElement("div");
        member.classList.add("member");
        member.innerHTML=e.user+" &#128994;";
        members.appendChild(member)
    
    })
})
form.addEventListener("submit",(e)=>
{e.preventDefault()
const text=e.target[0].value
const messageSent=document.createElement("div");
messageSent.classList.add("message-sent");
messageSent.innerHTML=`<span>${naame}<br></span>`+text;
messagesIO.appendChild(messageSent);
socket.emit("message_post",text,naame)
e.target[0].value=""
})
socket.on('message_rec',(text,sender)=>{
const messageRec=document.createElement("div");
messageRec.classList.add("message-rec");
messageRec.innerHTML=`<span>${sender}<br></span>`+text;
messagesIO.appendChild(messageRec);
})


