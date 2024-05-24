async function customerSignUp(){

    let usernameInput = document.getElementById('userName').value;
    let passwordInput = document.getElementById('password').value;
    let firstNameInput = document.getElementById('firstName').value;
    let lastNameInput = document.getElementById('lastName').value;
    let emailInput = document.getElementById('email').value;
    let phoneNumberInput = document.getElementById('phoneNumber').value;
    let customerAddressInput = document.getElementById('customerAddress').value;
    let customerData = {
        userName: usernameInput,
        password: passwordInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        phoneNumber: phoneNumberInput,
        customerAddress: customerAddressInput
    }
    const url = "http://localhost:5075/api/customers"

    fetch(url, {
        method: "POST",
        body: JSON.stringify(customerData),
        headers: {
            "Content-Type": "application/json"
        }
    })

    window.alert("Routing to sign in page")
    window.location.href = "/client/LoginPages/pages/signIn.html"
}

