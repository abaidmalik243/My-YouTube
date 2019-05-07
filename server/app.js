var express = require('express');
var bodyParser = require('body-parser')
var multer = require('multer')
var http = require('http');
var cors = require('cors');

var videoRouter = require('./routes/video');

var app = express();
app.options('*', cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors("*"));


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' +file.originalname )
//   }
// })

// var upload = multer({ storage: storage }).single('file')

// upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//         return res.status(500).json(err)
//     } else if (err) {
//         return res.status(500).json(err)
//     }
// return res.status(200).send(req.file)

// })

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Accept-Encoding', 'gzip,sdch');
//   if (req.method === 'OPTIONS') {
//       res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//       res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
//       return res.status(200).json({});
//   };

//     next();
// });

app.use('/video', videoRouter);
var server = http.createServer(app);
server.listen(3000, () => console.log('server run at 3000 port'));

// module.exports = app;