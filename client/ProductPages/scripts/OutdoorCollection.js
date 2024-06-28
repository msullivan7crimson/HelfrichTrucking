let furnitureUrl = "http://localhost:5075/api/Furniture/UnsoldFurniture";
let myFurniture = [];
let furniture = document.getElementById("furniture");

async function handleOnLoadOutdoor(){
    await getFurniture()
    renderSpecificCategory()
}

async function getFurniture() {
    let response = await fetch(furnitureUrl, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        myFurniture = await response.json();
    } else {
        console.log("Failed to fetch furniture data.");
    }
}

// async function renderMainCollection() {
//     const container = document.getElementById("outdoor");
//     container.innerHTML = "";  // Clear existing content if needed

//     myFurniture.forEach((furniture) => {
//         if(furniture.furnitureCollection === "Outdoor"){
//         // Create a new card for each item
//         const colDiv = document.createElement("div");
//         colDiv.className = "col";

//         const cardDiv = document.createElement("div");
//         cardDiv.className = "card shadow-sm";

//         // Create SVG element for the image
//         const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//         svg.setAttribute("class", "bd-placeholder-img card-img-top");
//         svg.setAttribute("width", "100%");
//         svg.setAttribute("height", "225");
//         svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
//         svg.setAttribute("focusable", "false");
//         const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
//         image.setAttribute("href", furniture.furnitureUrl);
//         image.setAttribute("width", "100%");
//         image.setAttribute("height", "225");
//         svg.appendChild(image);

//         // Card body
//         const cardBodyDiv = document.createElement("div");
//         cardBodyDiv.className = "card-body";

//         const cardTextH5 = document.createElement("h5");
//         cardTextH5.className = "card-text";
//         cardTextH5.textContent = `${furniture.furnitureName} • $${furniture.furniturePrice}`;

//         const cardTextP = document.createElement("p");
//         cardTextP.className = "card-text";
//         cardTextP.textContent = furniture.description;

//         const cardButtonsDiv = document.createElement("div");
//         cardButtonsDiv.className = "d-flex justify-content-between align-items-center";

//         const btnGroupDiv = document.createElement("div");
//         btnGroupDiv.className = "btn-group";
//         const viewBtn = document.createElement("button");
//         viewBtn.type = "button";
//         viewBtn.className = "btn btn-sm btn-outline-secondary";
//         viewBtn.textContent = "View";
//         viewBtn.onclick = () => populateModal(furniture);
//         btnGroupDiv.appendChild(viewBtn)

//         //event listener added to view button
        

//         const addToCartBtn = document.createElement("button");
//         addToCartBtn.type = "button";
//         addToCartBtn.className = "btn btn-sm btn-outline-secondary";
//         addToCartBtn.textContent = "Add to Cart";
//         addToCartBtn.onclick = () => addItemToCart(furniture);
//         btnGroupDiv.appendChild(addToCartBtn);

//         // const viewCartBtn = document.createElement("button");
//         // viewCartBtn.type = "button";
//         // viewCartBtn.className = "btn btn-sm btn-outline-secondary";
//         // viewCartBtn.textContent = "View Cart";
//         // viewCartBtn.onclick = () => showCartModal();  // Assuming showCartModal is the function to display the cart modal
//         // btnGroupDiv.appendChild(viewCartBtn);

//         const smallText = document.createElement("small");
//         smallText.className = "text-body-secondary";
//         smallText.textContent = "1 day ago"; // You might want to make this dynamic as well

//         cardButtonsDiv.appendChild(btnGroupDiv);
//         cardButtonsDiv.appendChild(smallText);

//         cardBodyDiv.appendChild(cardTextH5);
//         cardBodyDiv.appendChild(cardTextP);
//         cardBodyDiv.appendChild(cardButtonsDiv);

//         cardDiv.appendChild(svg);
//         cardDiv.appendChild(cardBodyDiv);
//         colDiv.appendChild(cardDiv);

//         container.appendChild(colDiv);
//         }
//     });
// }

function renderSpecificCategory(){
    const container = document.getElementById("outdoor");
    container.innerHTML = "";  // Clear existing content if needed
 
    const conditions = {
        "Excellent": document.getElementById('Excellent').checked,
        "Gently Used": document.getElementById('GentlyUsed').checked,
        "Like New": document.getElementById('LikeNew').checked,
        "Fair": document.getElementById('Fair').checked,
        "Good": document.getElementById('Good').checked
    }
    
    const priceLowToHigh = document.getElementById('LowToHigh').checked
    const priceHighToLow = document.getElementById('HighToLow').checked
    const anyConditionActive = Object.values(conditions).some(status => status);
 
    myFurniture.forEach((furniture) => {
        if (furniture.furnitureCollection === "Outdoor"){
        //if(furniture.furnitureCategory === currentCategory){   
        
        if (!anyConditionActive || Object.entries(conditions).some(([condition, isActiveCondition]) => {
                return isActiveCondition && furniture.furnitureCondition === condition;
            })) {

            if (priceLowToHigh){
                myFurniture.sort((a, b) => a.furniturePrice - b.furniturePrice);
            } else if (priceHighToLow) { 
                myFurniture.sort((a, b) => b.furniturePrice - a.furniturePrice);
            }

        // Create a new card for each item
        const colDiv = document.createElement("div");
        colDiv.className = "col";
 
        const cardDiv = document.createElement("div");
        cardDiv.className = "card shadow-sm";
 
        // Create SVG element for the image
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "bd-placeholder-img card-img-top");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "225");
        svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
        svg.setAttribute("focusable", "false");
        const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttribute("href", furniture.furnitureUrl);
        image.setAttribute("width", "100%");
        image.setAttribute("height", "225");
        svg.appendChild(image);
 
        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";

        const cardTextH5 = document.createElement("h5");
        cardTextH5.className = "card-text";
        cardTextH5.textContent = `${furniture.furnitureName} • $${furniture.furniturePrice}`;

        const cardTextP = document.createElement("p");
        cardTextP.className = "card-text";
        cardTextP.textContent = furniture.description;

        const cardButtonsDiv = document.createElement("div");
        cardButtonsDiv.className = "d-flex justify-content-between align-items-center";

        const btnGroupDiv = document.createElement("div");
        btnGroupDiv.className = "btn-group";
        const viewBtn = document.createElement("button");
        viewBtn.type = "button";
        viewBtn.className = "btn btn-sm btn-outline-secondary";
        viewBtn.textContent = "View";
        viewBtn.onclick = () => populateModal(furniture);
        btnGroupDiv.appendChild(viewBtn);

        const addToCartBtn = document.createElement("button");
        addToCartBtn.type = "button";
        addToCartBtn.className = "btn btn-sm btn-outline-secondary";
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.onclick = () => addItemToCart(furniture);
        btnGroupDiv.appendChild(addToCartBtn);

        cardButtonsDiv.appendChild(btnGroupDiv);

        cardBodyDiv.appendChild(cardTextH5);
        cardBodyDiv.appendChild(cardTextP);
        cardBodyDiv.appendChild(cardButtonsDiv);

        cardDiv.appendChild(svg);
        cardDiv.appendChild(cardBodyDiv);
        colDiv.appendChild(cardDiv);

        container.appendChild(colDiv);
            
            }
        
        
        }
    
    //}
    })




document.getElementById('Excellent').addEventListener('change', renderSpecificCategory);
document.getElementById('GentlyUsed').addEventListener('change', renderSpecificCategory);
document.getElementById('LikeNew').addEventListener('change', renderSpecificCategory);
document.getElementById('Fair').addEventListener('change', renderSpecificCategory);
document.getElementById('Good').addEventListener('change', renderSpecificCategory);

document.getElementById('LowToHigh').addEventListener('change', renderSpecificCategory);
document.getElementById('HighToLow').addEventListener('change', renderSpecificCategory);
}


function changeCategory(newCategory) {
    currentCategory = newCategory;
    renderSpecificCategory(); // Re-render the category display when category changes
}

function getCart() {
    let cart = localStorage.getItem('shoppingCart')
    //console.log(cart)
    if (cart === null){
        cart = []
        console.log("inside if")
        // localStorage.setItem('shoppingCart', JSON.stringify(cart))
    }

    else{
        cart = JSON.parse(cart)
        console.log("inside else")
        console.log(cart)

    }

    return cart
}

function addItemToCart(furnitureAdd){
    let cart = getCart()
    cart.push(furnitureAdd)
    localStorage.setItem('shoppingCart', JSON.stringify(cart))
}

//removes item by index, will most likely need to be changed based on actual product and its ID

function removeItemFromCart(index){
    let cart = getCart()
    cart.splice(index, 1)
    localStorage.setItem('shoppingCart', JSON.stringify(cart))
}

function showCartItems(){
    let cart = getCart()
    let cartDiv = document.getElementById('cart')
    cartDiv.innerHTML = '';
    cart.forEach((furniture, index) => {
        cartDiv.innerHTML += `<p>${furniture.name} - $${furniture.price} <button onclick="removeItemFromCart(${index})">Remove</button></p>`
    })
}

function populateModal(furniture) {
    try{
     let elem = document.getElementById("itemDetailsModal")
     let modalInstance = new bootstrap.Modal(elem)
     modalInstance.show()
      // Fetch and assign the modal title element
      modalTitle = document.getElementById("itemDetailsModalLabel");
      if (!modalTitle) throw new Error("Modal title element not found.");
      modalTitle.textContent = furniture.furnitureName;
  
      // Fetch and assign the modal image element
      const modalImage = document.querySelector("#itemDetailsModal .modal-body img");
      if (!modalImage) throw new Error("Modal image element not found.");
      modalImage.src = furniture.furnitureUrl; // Correct property is 'src', not 'textImage'
  
      // Fetch and assign the modal price element
      const modalPrice = document.querySelector("#itemDetailsModal .modal-body .col-md-8 h6:nth-child(1)");
      if (!modalPrice) throw new Error("Modal price element not found.");
      modalPrice.textContent = `Price: $${furniture.furniturePrice}`;
 
      // Fetch and assign the modal brand element
      const modalBrand = document.querySelector("#itemDetailsModal .modal-body .col-md-8 h6:nth-child(2)");
      if (!modalBrand) throw new Error("Modal brand element not found.");
      modalBrand.textContent = `Brand: ${furniture.furnitureBrand}`;
  
      // Fetch and assign the modal dimensions element
      const modalDimensions = document.querySelector("#itemDetailsModal .modal-body .col-md-8 h6:nth-child(3)");
      if (!modalDimensions) throw new Error("Modal dimensions element not found.");
      modalDimensions.textContent = `Dimensions: ${furniture.furnitureDimensions}`;
      
      // Fetch and assign the modal condition element
      const modalCondition = document.querySelector("#itemDetailsModal .modal-body .col-md-8 h6:nth-child(4)");
      if (!modalCondition) throw new Error("Modal condition element not found.");
      modalCondition.textContent = `Condition: ${furniture.furnitureCondition}`;
 
      //modalInstance.show()
 
     }
 catch (error) {
 alert("there was an error")
 }
 }

 function showCartModal() {
    const cartItemsDiv = document.getElementById('cartItems');
    let cart = getCart();  
    console.log(cart)
    cartItemsDiv.innerHTML = '';  // Clear previous contents

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemHtml = `
                <div class="row mb-2">
                    <div class="col-md-4">
                        <img src="${item.furnitureUrl}" alt="Image of ${item.furnitureName}" style="width: 100%;"/>
                    </div>
                    <div class="col-md-8">
                        <h5>${item.furnitureName} - $${item.furniturePrice}</h5>
                        <p> Condition: ${item.furnitureCondition}</p>
                        <button onclick="removeItemFromCart(${index})" class="btn btn-danger btn-sm">Remove</button>
                    </div>
                </div>
            `;
            cartItemsDiv.innerHTML += itemHtml;
        });
    }

    // Show the modal
    let modalInstance = new bootstrap.Modal(document.getElementById('cartModal'));
    modalInstance.show();
}