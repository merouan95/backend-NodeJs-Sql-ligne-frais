
//lister  de tous les ligne de frais
exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM LigneFrais',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
              
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(rows));
      
             
           });
           
        
      });
    
  };
  
  exports.edit = function(req, res){
      
      var id = req.params.id;
      
      req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM LigneFrais WHERE id = ?',[id],function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
            
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(rows));   
             
           });
           
          
      }); 
  };
  
  // ajouter une ligne de frais
  exports.save = function(req,res){
      
      var input = JSON.parse(JSON.stringify(req.body));
      
      req.getConnection(function (err, connection) {
          
          var data = {
              
              montantLigneFrais    : input.montantLigneFrais,
              typeLigneFrais : input.typeLigneFrais,
              dateLigneFrais   : input.dateLigneFrais 
          
          };
         console.log('save request...', data);
  
          var query = connection.query("INSERT INTO LigneFrais set ? ",data, function(err, rows)
          {
    
            if (err)
                console.log("Error inserting : %s ",err );
           
         
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify('success'));
            
          });
          
       
      
      });
  };
  
  exports.save_edit = function(req,res){
      
      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;
      
      req.getConnection(function (err, connection) {
          
          var data = {
              
              montantLigneFrais    : input.montantLigneFrais,
              typeLigneFrais : input.typeLigneFrais,
              dateLigneFrais   : input.dateLigneFrais 
          
          };
          
          connection.query("UPDATE LigneFrais set ? WHERE id = ? ",[data,id], function(err, rows)
          {
    
            if (err)
                console.log("Error Updating : %s ",err );
           
            res.redirect('/ligneFrais');
            
          });
      
      });
  };
  
  
  exports.delete_LigneFrais = function(req,res){
            
       var id = req.params.id;
      
       req.getConnection(function (err, connection) {
          
          connection.query("DELETE FROM LigneFrais  WHERE id = ? ",[id], function(err, rows)
          {
              
               if(err)
                   console.log("Error deleting : %s ",err );
              
               res.redirect('/ligneFrais');
               
          });
          
       });
  };
  
  
  