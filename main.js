document.addEventListener("DOMContentLoaded", function () {

const loader = document.querySelector(".loader");
if(loader){
loader.classList.remove("visible");
document.body.style.overflow = "auto";
}

/* EmailJS initialization */
emailjs.init("YOUR_PUBLIC_KEY");

/* Contact form */

const form = document.getElementById("contact-form");
const responseMessage = document.getElementById("response-message");

if(form){

form.addEventListener("submit", function(event){

event.preventDefault();

emailjs.sendForm(
"YOUR_SERVICE_ID",
"YOUR_TEMPLATE_ID",
form
)

.then(function(){

responseMessage.textContent = "Message sent successfully!";
responseMessage.style.color = "green";

form.reset();

})

.catch(function(){

responseMessage.textContent = "Failed to send message.";
responseMessage.style.color = "red";

});

});

}

});
