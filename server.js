var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').pool;
var config=
{
  user:'shobika1997',
  database:'shobika1997',
  host:'db.imad.hasura-app.io',
  password:process.env.DB_PASSWORD
  
  
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res)
{//Make select request
//return a resp with result
   pool.query('SELECT * FROM test', function(err,result)
   
   {
       if(err)
   {res.status(500).send(err.toString());
   }
   else
   {res.send(JSON.stringify(result));
   }
   });
});
var counter=0;


app.get('/counter',function(req,res)
{ 
    counter=counter+1;
    res.send(counter.toString());
});
app.get('/article-one',function(req,res)
{res.send('Article one requested will be servered here')});
app.get('/article-two',function(req,res){res.send('Article two requested will be servered here')});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
