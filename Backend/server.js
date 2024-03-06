require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const app = express();
const port = process.env.PORT;

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME
});

// MIDDLEWARES 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function (req, res) {
    res.send('');
});

app.get('/termekek', function (req, res) {
    pool.query(`SELECT * FROM termekek`, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}...`);
});