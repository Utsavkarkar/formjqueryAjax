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

 $(document).ready(function () {

   // create user
   $('#loginform').on('submit', function(event) { 
      event.preventDefault(); 
        
      // It returns a array of object  
      let userinfo = $(this).serializeArray(); 
      let user = {}; 
      userinfo.forEach((value) => { 
            
          // Dynamically create an object 
          user[value.name] = value.value; 
      }); 
      // let url = "http://localhost:3000/createUser"; 
      $.ajax({ 
          method: "POST", 
          url: "http://localhost:3000/createUser", 
          data: user 
      }).done(function(msg) { 
          // When the request is successful 
          // $('span').text(msg.msg);
          if(msg.msg == "User created") {
              location.href = "http://localhost:3000/dashboard";
          }
          $('#responseToast .toast-body').text(msg.msg); 
          $('.toast').toast('show');
          
      }).fail(function(err, textstatus, error) { 
          // $('span').text(textstatus); 

          $('#responseToast .toast-body').text(textStatus); 
          $('.toast').toast('show');

      }); 
  });

   // create contact
   $("#addContactForm").on("submit", function (event) {
     event.preventDefault();
     // It returns a array of object
     let userinfo = $(this).serializeArray();
     let user = {};
     userinfo.forEach((value) => {
       // Dynamically create an object
       user[value.name] = value.value;
     });
     // let url = "http://localhost:3000/createUser";
     $.ajax({
       method: "POST",
       url: "http://localhost:3000/createContact",
       data: user,
       success: function (data) {
         // console.log(data);
         if(data.flag == 1) {
            $.get("/dashboard", function(newPage){
               console.log(newPage);
               $("#exampleModal").modal('hide');
               // $("body").html(newPage);
           });
         }
       },
       error: function (err, textstatus, error) {
         console.log(err);
       }
     })
      //  .done(function (msg) {
      //    // When the request is successful
      //    // $('span').text(msg.msg);
      //    // if (msg.msg == "Contact created") {
      //    //   $.get("/showContact", function (data) {
      //    //     $("body").html(data);
      //    //   });
      //    // }
      //    console.log(msg);
      //    $("#responseToast .toast-body").text(msg.msg);
      //    $(".toast").toast("show");
      //  })
      //  .fail(function (err, textstatus, error) {
      //    // $('span').text(textstatus);

      //    $("#responseToast .toast-body").text(textStatus);
      //    $(".toast").toast("show");
      //  });
   });
 });