// make a socket connection to server 5001
const sckt = new WebSocket("ws://localhost:5001")
const log = document.getElementById('log')
const myName = document.getElementById('myName')


const userName = prompt("What is your name?")
sckt.onopen = function() {
  sckt.send(JSON.stringify({
    type: "name",
    data: userName
  }))
  myName.innerHTML = userName
}

// when server sends a msgEvent, get its data and add to screen
sckt.onmessage = function (event) {
  console.log(event);
  const wholeMsg = JSON.parse(event.data)
  log.innerHTML+= wholeMsg.name+ ": " + wholeMsg.data + "<br>"
}

// send msg on textBox when button is clicked
document.querySelector('button').onclick = function () {
  const text = document.getElementById('text').value
  sckt.send(JSON.stringify({
    type: "messsage",
    data: text
  }))
  log.innerHTML+= "You: " + text + "<br>"
}
