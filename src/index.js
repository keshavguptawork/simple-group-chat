const server = require('ws').Server
const wsServer = new server({ port: 5001 })

wsServer.on('connection', function (wsClient) {
  wsServer.on('', function () {
    console.log(`${wsClient} joined`);   
  })

  wsClient.on('message', function (message) {
    // parse received msg and assign name to it
    message = JSON.parse(message)
    if (message.type === "name") {
      wsClient.personName = message.data
      console.log(`>>> ${wsClient.personName} joined the room`);
      
      return
    }
    console.log(`${wsClient.personName}: ${message.data}`);
    
    // iterate over all clients and send them new msg
    wsServer.clients.forEach((client) => {
      if (client != wsClient)
        client.send(JSON.stringify({
          name: wsClient.personName,
          data: message.data
        }))
      });  
  })

  wsClient.on('close', function () {
    console.log(`>>> ${wsClient.personName} left`);   
  })
})
