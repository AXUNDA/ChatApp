






const chatForm = document.getElementById('chat-form');
const chatMessages= document.querySelector(".chat-messages");
const roomName= document.getElementById("room-name")
const userList= document.getElementById("users")

const {username,room} = Qs.parse(location.search,{
      ignoreQueryPrefix: true
})
// alert(username)
// alert(room)
chatForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      const msg =document.getElementById('msg').value
      // alert(msg);
      socket.emit("chatMessage",msg);
})

const socket = io();
socket.emit("join-room",{username,room})
// function outputMessage(msg){
//       const div = document.createElement("div");
//       div.classList.add("message")
//       div.innerHTML= `<p class="meta">Mary <span>9:15pm</span></p>
//       <p class="text">
//             ${msg}
//       </p>`
//       document.querySelector('.chat-messages').appendChild(div)
// }

socket.on("message",(message)=>{
      console.log(message)
      outputMessage(message)
      chatMessages.scrollTop=chatMessages.scrollHeight
      document.getElementById('msg').value=""
      document.getElementById('msg').focus()


})
socket.on("users",({room,users})=>{
      // alert(room)
      // alert(users)
      // console.log(users)
      outputRoomName(room)
      outputUsers(users)
})
function outputMessage(msg){
      const div = document.createElement("div");
      div.classList.add("message")
      div.innerHTML= `<p class="meta">${msg.userName} <span>${msg.time}</span></p>
      <p class="text">
            ${msg.message}
      </p>`
      document.querySelector('.chat-messages').appendChild(div)
      // document.getElementsByClassName("chat-messages")[0].appendChild(div)
}
function outputRoomName(room){
      roomName.innerText=room

}
function outputUsers(users){
      console.log(users)
      userList.innerHTML=`
      ${users.map(user =>`<li>${user.username} </li>`).join('')}
      `
}
document.getElementById('leave-btn').addEventListener('click', () => {
      const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
      if (leaveRoom) {
        window.location = '../index.html';
      } else {
            return;
      }
    });
    