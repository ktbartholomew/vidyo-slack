var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(require('./services/auth'));
app.use('/', require('./routers/index'));

var server = app.listen(process.env.VS_NODE_PORT || 3000);
console.log('Listening on port ' + (process.env.VS_NODE_PORT || 3000) + '...');
