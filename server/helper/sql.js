"use strict"
const mysql = require('mysql');
var util = require('util');
const sqlPool = mysql.createPool({
    //connectionLimit: 1000,
    //connectTimeout: 60 * 60 * 1000,
    //aquireTimeout: 60 * 60 * 1000,
    //timeout: 60 * 60 * 1000,

    host: 'localhost',
    user: 'root',
    password: '',

    // host: '142.93.102.239',
    // user: 'root',
    // password: 'DAtabase$435$',

    // host: '134.209.124.196',
    // user: 'dbuser',
    // password: 'DAtabase$435$',

    database: 'youtube_db',
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: true
});

sqlPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) { 
        connection.release();
        console.log('Database successfully connected!');
     }
    return
});



sqlPool.query = util.promisify(sqlPool.query); // Magic happens here.
module.exports = sqlPool;