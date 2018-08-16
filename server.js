const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/booksApp'));

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname+'/dist/booksApp/index.html'));
});

app.liste(process.env.PORT || 8080);