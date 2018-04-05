const tls = require('tls');
const fs = require('fs');

const options = {
  key: fs.readFileSync('store/server-key.pem'), // Clave y certificado que presenta al cliente
  cert: fs.readFileSync('store/server-cert.pem'),
  isServer: true,
  requestCert: true,
  rejectUnauthorized: false,
  ca: [ fs.readFileSync('store/client-cert.pem') ] // Certificados en los que confía
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
       process.exit(0);
    });

});

server.listen(8000, () => {
   console.log('\x1b[33m%s\x1b[0m','Esperando conexión con el cliente...');
});

