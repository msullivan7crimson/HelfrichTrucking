let furnitureUrl = "http://localhost:5075/api/Furniture";
let myFurniture = [];
let furniture = document.getElementById("furniture");

let orderUrl = "http://localhost:5075/api/Order";
let myOrders = [];
let orders = document.getElementById("orders");

let custUrl = "http://localhost:5075/api/Customers"
let myCust = []
let cust = document.getElementById("customers")

async function getOrders(){
    let response = await fetch(orderUrl, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    myOrders = await response.json()
}

async function getFurniture(){
    let response = await fetch(furnitureUrl+"/UnsoldFurniture", {
        headers: {
            "Content-Type": "application/json"
        }
    })
    myFurniture = await response.json()
}

function handleOnLoadOrders(){
    getOrders()
    getFurniture()
    // checkCustomerSession();
}

async function createNewOrder() {
    const loggedInCustomerId = getLoggedInCustomerId();
    if (!loggedInCustomerId) {
        alert("No customer ID found. Redirecting to sign in page");
        window.location.href='/client/LoginPages/pages/signIn.html';
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem('shoppingCart'));
    if (!cartItems || cartItems.length === 0) {
        console.error("Cart is empty.");
        return;
    }

    //added order price line
    const orderPrice = cartItems.reduce((total, item) => total + item.furniturePrice, 0);

    const orderDetails = {
        customerID: loggedInCustomerId,
        orderPrice: orderPrice,
        orderDate: new Date().toISOString(),
    };

    try {
        let response = await fetch(orderUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails)
        });

        if (response.ok) {
            alert("If you would like to confirm the order, press OK")
            const response = await fetch(orderUrl +"/LastPlacedOrder");
            const lastPlacedOrderId = await response.json() // ensure you await the JSON parsing as well
            cartItems.forEach(async(item) => {
                await updateFurnitureItems(item.furnitureID, lastPlacedOrderId);  // Update should be awaited, and should only update the current item
                localStorage.removeItem('shoppingCart');
                localStorage.clear()
                alert("Your order has been placed! Thank you!")
                window.location.href='/client/LandingPage/pages/landingPage.html'; // Clear cart after all items processed
            })
            console.log("All orders processed and cart cleared.");
        } else {
            console.error("Failed to create order", response.statusText);
        }
    } catch (error) {
        console.error("Error when trying to place order for furniture ID:", item.furnitureID, error);
    }   
}

async function updateFurnitureItems(furnitureID, orderID) {
    try {
        await fetch(`${furnitureUrl}/${orderID}/${furnitureID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });
        // if (response.ok) {
        //     console.log('All furniture items updated successfully with order ID:', orderID);
        // }
    } catch (error) {
        console.error('Error updating furniture items:', error);
    }
}



function checkCustomerSession() {
    const customerID = localStorage.getItem('loggedInCustomerId');
    if (customerID) {
        getCustomerDetails(customerID);
    } else {
        console.log("No admin customer found. Please log in.");
    }
}
async function getCustomerDetails(customerID) {
    let response = await fetch(`${custUrl}/${customerID}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        const customerData = await response.json();
        renderCustomer(customerData);
    } else {
        console.log("Failed to fetch customer details.");
    }
}

function renderCustomer(matchingCustomer) {
    const customerInfo = document.getElementById("customer-information");
    if (matchingCustomer) {
        let html = `<p>${matchingCustomer.firstName}</p>`;
        customerInfo.innerHTML = html;
    } else {
        console.log("No logged-in admin found or user is not logged in.");
    }
}

function getLoggedInCustomerId(){
    return localStorage.getItem('loggedInCustomerId')
}







