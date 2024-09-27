document.addEventListener("DOMContentLoaded", function() {
    const loader = document.querySelector('.loader');
    loader.classList.remove('visible');
    document.body.style.overflow = 'auto';

    // Initialize EmailJS with your user ID
    emailjs.init("YOUR_USER_ID"); 

    // Contact form submission handling
    const form = document.getElementById("contact-form");
    const responseMessage = document.getElementById("response-message");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Send email via EmailJS
        emailjs.sendForm('asheedeliyangod@gmail.com', 'https://asheedeliyangod.github.io/my-portfolio-demo/', form)
            .then(function(response) {
                console.log("SUCCESS!", response.status, response.text);
                responseMessage.textContent = "Your message has been sent successfully!";
                form.reset(); // Clear the form after submission
            }, function(error) {
                console.error("FAILED...", error);
                responseMessage.textContent = "Failed to send your message. Please try again.";
            });
    });
});
