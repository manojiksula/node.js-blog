let type;

if(process.env.NODE_ENV == 'production') {
    type = 'CHANGE_ME !';
} else {
    type = 'mongodb://localhost/nodejsblog';
}

module.exports = type;