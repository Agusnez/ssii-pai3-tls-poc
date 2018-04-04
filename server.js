const tls = require('tls');
const fs = require('fs');

const options = {
  // Necessary only if using the client certificate authentication
  key: fs.readFileSync('store/client-key.pem'),
  cert: fs.readFileSync('store/client-crt.pem'),
  requestCert: true,  
  // Necessary only if the server uses the self-signed certificate
  ca: [ fs.readFileSync('store/ca-crt.pem') ]
};

const server = tls.createServer(options, (socket) => {
    console.log('\x1b[1;32m%s%s\x1b[0m','Conexión establecida con el cliente: ', socket.authorized ? 'Autorizada' : 'No autorizada');

    socket.setEncoding('utf8');

    process.stdin.pipe(socket);
    process.stdin.resume();

    socket.addListener("data", function (data) {
        console.log('\x1b[0;34m%s\x1b[1;34m%s\x1b[0m','Cliente: ',data.replace(/(\r\n|\n|\r)/gm,""));
    });

    socket.on('end', () => {
       server.close();
       console.log('\x1b[1;31m%s\x1b[0m','Desconectado del cliente');
    });

});

server.listen(8000, () => {
   console.log('\x1b[33m%s\x1b[0m','Esperando conexión con el cliente...');
});

