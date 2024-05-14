
function showContactModal(){
    let modalElement = document.getElementById('contactModal')
    let modalInstance = bootstrap.Modal.getInstance(modalElement)
    if(!modalInstance) {
        modalInstance = new bootstrap.Modal(modalElement)
    }
    modalInstance.show()
}

function sendEmail() {
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company_name: document.getElementById('company name').value,
        phone_number: document.getElementById('phone number').value,
        message: document.getElementById('message').value
    };

    emailjs.send("service_jij563c", "template_366o5ya", templateParams)
    .then(() => {
        alert('Message successfully sent! We will get in touch with you as soon as possible.');

        // Clear the form fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('company name').value = '';
        document.getElementById('phone number').value = '';
        document.getElementById('message').value = '';

        // Hide the modal
        let modalElement = document.getElementById('contactModal')
        let modalInstance = bootstrap.Modal.getInstance(modalElement)
        modalInstance.hide();
    })
    .catch((error) => {
        console.log('FAILED...', error);
        alert('Failed to send email.');
    });
}
