const express = require('express'),
    path = require('path');
    
const app = express();

app.use(express.static('./dist/booksApp'));

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname,'dist/booksApp/index.html'));
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname,'dist/booksApp/index.html'));
  });

app.listen(process.env.PORT || 8080, ()=> {
    console.log('Server running');
});