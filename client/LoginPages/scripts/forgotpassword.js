// function sendMail() {
//     var params = {
//       name: document.getElementById("name").value,
//       email: document.getElementById("email").value,
//       message: document.getElementById("message").value,
//     };
  
//     const serviceID = "service_lldhcry";
//     const templateID = "template_5r7tk25";
  
//       emailjs.send(serviceID, templateID, params)
//       .then(res=>{
//           document.getElementById("name").value = "";
//           document.getElementById("email").value = "";
//           document.getElementById("message").value = "";
//           console.log(res);
//           alert("Your message sent successfully!!")
  
//       })
//       .catch(err=>console.log(err));
  
//   }
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded");

  document.getElementById("submitButton").addEventListener("click", function () {
      console.log("Submit button clicked");

      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var message = document.getElementById("message").value;

      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);

      // Check if any of the fields are empty
      if (!name || !email || !message) {
          alert("Please fill in all fields.");
          return;
      }

      var params = {
          name: name,
          email: email,
          message: message
      };

      console.log("Params:", params);

      const serviceID = "service_lldhcry";
      const templateID = "template_5r7tk25";

      emailjs.send(serviceID, templateID, params)
          .then(function (res) {
              document.getElementById("name").value = "";
              document.getElementById("email").value = "";
              document.getElementById("message").value = "";
              console.log("Email sent:", res);
              alert("Your message has been sent successfully! Returning to sign in page");
          })
          .catch(function (err) {
              console.error("Error sending email:", err);
              alert("Your message has been sent successfully!");
          });
  });
});


