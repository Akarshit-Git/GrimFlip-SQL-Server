const mysql = require('mysql2');

const express = require('express');
var app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

const connection = mysql.createConnection({
    host: 'localhost', // host for connection
    port: 3306, // default port for mysql is 3306
    database: 'testDB', // database from which we want to connect out node application
    user: 'root', // username of the mysql connection
    password: 'root1234' // password of the mysql connection
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
        console.log("error occured while connecting");
    }
    else {
        console.log("connection created with Mysql successfully");
    }
});

app.listen(3000, () => console.log('Server running at 3000 port'));

//GET all rows
app.get('/test', (req, res) => {
    connection.query('SELECT * FROM test1', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            {console.log(err);}
    });
});

//GET specific row
app.get('/test/:id', (req, res) => {
    connection.query('SELECT * FROM test1 WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            {console.log(err);}
    });
});

//Delete specific row
app.get('/test/:id', (req, res) => {
    connection.query('DELETE FROM test1 WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted');
        else
            {console.log(err);}
    });
});