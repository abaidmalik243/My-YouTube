var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');
var cors = require('cors');
const path = require('path');
var videoRouter = require('./routes/video');
var app = express();

app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors("*"));

app.use('/video', videoRouter);
var server = http.createServer(app);
server.listen(3000, () => console.log('server run at 3000 port'));
