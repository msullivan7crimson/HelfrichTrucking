let custUrl = "http://localhost:5075/api/Customers"
let myCust = []
let cust = document.getElementById("customers")


function handleOnLoadCustomer(){
    checkCustomerSession()
}

async function sellFurniture(){
    const loggedInCustomerId = getLoggedInCustomerId()
    console.log(loggedInCustomerId)
    if (!loggedInCustomerId) {
        alert("You must be logged in to sell furniture, routing to sign in page")
        window.location.href="/client/LoginPages/pages/signIn.html";
    }

    let furnitureNameInput = document.getElementById('furnitureName').value;
    let furniturePriceInput = parseFloat(document.getElementById('furniturePrice').value);
    let furnitureBrandInput = document.getElementById('furnitureBrand').value;
    let furnitureConditionInput = document.getElementById('furnitureCondition').value;
    let furnitureDimensionsInput = document.getElementById('furnitureDimensions').value;
    let furnitureUrlInput = document.getElementById('furnitureUrl').value;
    let furnitureCollectionInput = document.getElementById('furnitureCollection').value;
    let furnitureCategoryInput = document.getElementById('furnitureCategory').value;
    let furnitureSubcategoryInput = document.getElementById('furnitureSubcategory').value;
    
    let furnitureData = {
        furnitureName : furnitureNameInput,
        furniturePrice : furniturePriceInput,
        furnitureBrand : furnitureBrandInput,
        furnitureCondition : furnitureConditionInput,
        furnitureDimensions : furnitureDimensionsInput,
        furnitureSold : false,
        furnitureUrl : furnitureUrlInput,
        furnitureCollection: furnitureCollectionInput,
        sellerID : loggedInCustomerId,
        furnitureCategory: furnitureCategoryInput,
        furnitureSubcategory: furnitureSubcategoryInput,
        orderID : null
    };
    const url = "http://localhost:5075/api/Furniture/UnsoldFurniture";
 
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(furnitureData),
        headers: {
            "Content-Type": "application/json"
        }
    });

    window.alert("Routing to home page")
    window.location.href="/client/LandingPage/pages/landingPage.html"
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
        // renderCustomer(customerData);
    } else {
        console.log("Failed to fetch customer details.");
    }
}

// function renderCustomer(matchingCustomer) {
//     const customerInfo = document.getElementById("customer-information");
//     if (matchingCustomer) {
//         let html = `<p>${matchingCustomer.firstName}</p>`;
//         customerInfo.innerHTML = html;
//     } else {
//         console.log("No logged-in admin found or user is not logged in.");
//     }
// }

function getLoggedInCustomerId(){
    return localStorage.getItem('loggedInCustomerId')
}