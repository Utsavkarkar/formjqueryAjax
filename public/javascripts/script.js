$(document).ready(function () { 
    $("#loginSubmitBtn").click(function () { 
       $.post("/createUser", 
          { 
             name: req.body.name, 
             email: req.body.email,
             password: req.body.password
          }, 
          function (data, status) { 
             console.log(data); 
          }); 
    }); 
 }); 