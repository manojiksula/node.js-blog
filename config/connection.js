let type;

if(process.env.NODE_ENV == 'production') {
    type = 'mongodb://vali:testingthetest9@ds145346.mlab.com:45346/nodejsblog';
} else {
    type = 'mongodb://localhost/nodejsblog';
}

module.exports = type;