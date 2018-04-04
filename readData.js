module.exports = {
    exists: function exists(user,password,cb) {

        var exists = false;

        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('data/users')
        });
        
        lineReader.on('line', function (line) {
       
        var userRead = line.split(':')[0];
        var passwordRead = line.split(':')[1];

        if (user == userRead && password === passwordRead) {
            exists = true;
        }
        });

        lineReader.on('close', function(){
            if (exists) {
                cb(true);
            } else {
                cb(false);
            }
        });
    }
}