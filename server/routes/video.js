var express = require('express');
var router = express.Router();
var multer = require('multer')
const path = require('path');
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
    if (req.file) {
        var title = req.body.title;
        var description = req.body.description;
        var thumbnail = req.file.filename;

        if (title !== '') {
            var queryVideo = "INSERT INTO video (title, description, thumbnail)";
            queryVideo += " VALUES('" + title + "', '" + description + "', '" + thumbnail + "')";
            sql.query(queryVideo, async function (error, rows) {
                if (error) throw error;
            })
        }
    } else {
        console.log('No File Uploaded');
    }

});

module.exports = router;
