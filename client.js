const tls = require('tls');
const fs = require('fs');
const net = require('net');

const options = {
    //host: '13.92.230.143', // Si el servidor está en otra máquina, se debe especificar la ip de esta.
    key: fs.readFileSync('store/client-key.pem'), // Credenciales que presenta al servidor
    cert: fs.readFileSync('store/client-cert.pem'),
    isServer: false,
    requestCert: true,
    rejectUnauthorized: false,
    ca: [ fs.readFileSync('store/server-cert.pem') ] // Certificados en los que confía
  };

const socket = tls.connect(8000, options, () => {
    console.log('\x1b[1;32m%s%s\x1b[0m','Conexión establecida con el servidor: ', socket.authorized ? 'Autorizada' : 'No autorizada');

    socket.setEncoding('utf8');
    
    process.stdin.pipe(socket);
    process.stdin.resume();

});


socket.on('data', (data) => {
    console.log('\x1b[0;34m%s\x1b[1;34m%s\x1b[0m','Servidor: ',data.replace(/(\r\n|\n|\r)/gm,""));
});

socket.on('end', () => {
    console.log('\x1b[1;31m%s\x1b[0m','Desconectado del servidor');
    process.exit(0);
});