var express = require('express');


var http = require('http');
var path = require('path');
var fs = require("fs");



var ligne_frais = require('./routes/ligne_frais'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

 
app.set('port', process.env.PORT || 4300);
 
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

 
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

 
app.use(
    
    connection(mysql,{
        
        host: 'localhost',  
        user: 'root',
        password : '74db0cdc', //mettez ici votre propre mot de passe de mysql
        port : 3306,  
        database:'lignefrais_db'

    },'request')  

);


//home
/* 
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + './index.html'));
}); */

 
app.get('/ligneFrais', ligne_frais.list); 
app.post('/ligneFrais/add', ligne_frais.save);
app.get('/ligneFrais/delete/:id', ligne_frais.delete_LigneFrais);
app.get('/ligneFrais/edit/:id', ligne_frais.edit);
app.post('/ligneFrais/edit/:id',ligne_frais.save_edit);


 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
