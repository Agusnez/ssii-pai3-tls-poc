const fs = require('fs');
const http = require('http');
const https = require('https');
const layout = require('express-layout');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');

var privateKey  = fs.readFileSync('store/server-key.pem', 'utf8');
var certificate = fs.readFileSync('store/server-crt.pem', 'utf8');
var ca = fs.readFileSync('store/ca-crt.pem', 'utf8');
var dhParam = fs.readFileSync('sslcert/dh-strong.pem');

var credentials = {key: privateKey, cert: certificate, passphrase: 'comidadelabuena',ca: ca, requestCert:true, rejectUnauthorized: true, agent: false ,dhParam: dhParam};
var express = require('express');
var app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    if (req.secure) {
        next();
    } else {
        var host = req.get("host").split(":")[0];
        res.redirect("https://" + host+ ":8443" + req.originalUrl);
    }
});

const middlewares = [
    layout(),
    express.static(path.join(__dirname, 'public')),
    bodyParser.urlencoded({
        extended: true
    })
];
app.use(middlewares);
  
app.use('/', routes);

app.use((req, res, next) => {
    res.status(404).send("Error 404. Recurso no encontrado.");
});
  
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo ha fallado!');
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443, function(){
    console.log("\x1b[33m%s\x1b[0m","Servidor corriendo...");
});
