let x = true;
var io =null;
var httpServer1, corsorigin1
 async function setHttpServer(httpServer, corsorigin) {
    httpServer1=httpServer;
    corsorigin1=corsorigin;
    io=require('socket.io')(httpServer, corsorigin)
    io.on('connection', (socket) => {
        // SEND_NOTIFICATOIN(socket);
        global.WebSocketReferance=io;
        
        socket.on('disconnect', () => {
            
        });
        socket.on('received', function (data) {
            
        });
    })
    return io;
}
function SEND_NOTIFICATOIN(socket) {
    socket.emit('data1', Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10));
    
    setTimeout(() => {
        SEND_NOTIFICATOIN(socket);
    }, 1000);
}
async function getSocketProperties(){
  return io;
}
module.exports = {
    setHttpServer: setHttpServer,
    SEND_NOTIFICATOIN: SEND_NOTIFICATOIN,
    getSocketProperties:getSocketProperties
}