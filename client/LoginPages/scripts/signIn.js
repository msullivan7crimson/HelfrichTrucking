let customerUrl = "http://localhost:5075/api/Customers"
let myCustomers = []
let customers = document.getElementById("customers")

async function handleOnLoad(){
    getCustomer()
}

async function getCustomer(){
    let response = await fetch(customerUrl, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    myCustomers = await response.json()
}

async function customerLogin(){
    await getCustomer()
    let email = document.getElementById("CustomerEmail").value
    let password = document.getElementById("CustomerPassword").value
    try{
        const response = await fetch(customerUrl)
        const customers = await response.json()

        const matchingCustomer = customers.find(customer => customer.email === email && customer.password === password);

        if (matchingCustomer) {
            localStorage.setItem("loggedInCustomerId", matchingCustomer.customerID);
            window.location.href ="../../../client/LandingPage/pages/landingPage.html";
        } else {
            alert('Login failed: Invalid email or password.');
        }

        return isValidLogin;
        
    } catch(error){
        console.error("Error while validating credentials:", error)
        return false;
    }
}