var express = require('express');
var router = express.Router();
var multer = require('multer')
const path=require('path');


const sql = require('../helper/sql.js');

var storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {//replace function 
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1345330 },
    fileFilter: function (req, file, cb) {
        checkfile(file, cb);

    }
});

function checkfile(file, cb) {

    const fileTypes = /jpg|png|jpeg|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true)
    }
    else {
        cb('Error, Images only');
    }
}


router.post('/add', upload.single('imageUpload'), (req, res) => {
    console.log('hi.......')
    if (req.file) {
        console.log('Uploading file...');
    const data = {
            title: req.body.title,
            description: req.body.description,
            imageUpload :req.file.filename,
        }
        console.log('data at server check: ===============')
        console.log(data)
        // book.save().then(result=>{
        //     console.log('data save');
        //     res.status(200).json({result});
        // }).catch(err=>{console.log(err)});
    } else {
        console.log('No File Uploaded');
       
    }
    
    
    });


/*** Add Video ***/
// router.post('/add', async function (req, res) {
    // console.log('file is: ',req.files.selectedFile); return;
    // console.log(req.body.title);
    // res.send("testing...")

    // var storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //     cb(null, 'uploads')
    //   },
    //   filename: function (req, file, cb) {
    //       console.log('file at server: ', file)
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



    // console.log('title at server is: ', req.body.title)
    // var title = req.body.title;
    // var description = req.body.description;
    // if (title !== '') {
    //     var queryVideo = "INSERT INTO video (title, description)";
    //     queryVideo +=" VALUES('" + title + "', '" + description +"')";
    //     // console.log('query is: ', queryVideo);
    //     sql.query(queryVideo, async function (error, rows) {
    //         if (error) throw error;   
    //     })
    // }

// });

module.exports = router;
