var fs = require('fs'); 
var https = require('https'); 
var options = { 
    hostname: 'localhost', 
    port: 8443, 
    path: '/', 
    method: 'GET',
    key: fs.readFileSync('store/client-key.pem', 'utf8'), 
    cert: fs.readFileSync('store/client-crt.pem', 'utf8'), 
    ca: fs.readFileSync('store/ca-crt.pem', 'utf8') 
}; 
var req = https.request(options, function(res) { 
    res.on('data', function(data) { 
        process.stdout.write(data); 
    }); 
}); 
req.end();

req.on('error', function(e) { 
    console.error(e); 
});