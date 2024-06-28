// Create the card elements
const cardContainer = document.getElementById('cardContainer');
const frontSection = document.createElement('div');
frontSection.className = 'frontSection';
const backSection = document.createElement('div');
backSection.className = 'backSection';
 
// Create the front section elements
const imageSection = document.createElement('div');
imageSection.className = 'imageSection';
const chipImg = document.createElement('img');
chipImg.src = '/client/productpages/img/chip.png';
// const visaImg = document.createElement('img');
// visaImg.src = './img/visa.png';
imageSection.appendChild(chipImg);
// imageSection.appendChild(visaImg);
 
const cardNumberBox = document.createElement('div');
cardNumberBox.className = 'cardNumberBox';
cardNumberBox.textContent = '################';
 
const flexbox = document.createElement('div');
flexbox.className = 'flexbox';
const cardHolderBox = document.createElement('div');
cardHolderBox.className = 'box';
const cardHolderSpan = document.createElement('span');
cardHolderSpan.textContent = 'card holder';
const cardHolderName = document.createElement('div');
cardHolderName.className = 'cardHolderName';
cardHolderName.textContent = 'full name';
cardHolderBox.appendChild(cardHolderSpan);
cardHolderBox.appendChild(cardHolderName);
 
const expirationBox = document.createElement('div');
expirationBox.className = 'box';
const expirationSpan = document.createElement('span');
expirationSpan.textContent = 'expiration';
const expiration = document.createElement('div');
expiration.className = 'expiration';
const expMonth = document.createElement('span');
expMonth.className = 'exp-month';
expMonth.textContent = 'mm';
const expYear = document.createElement('span');
expYear.className = 'exp-year';
expYear.textContent = 'yy';
expiration.appendChild(expMonth);
expiration.appendChild(expYear);
expirationBox.appendChild(expirationSpan);
expirationBox.appendChild(expiration);
 
flexbox.appendChild(cardHolderBox);
flexbox.appendChild(expirationBox);
 
frontSection.appendChild(imageSection);
frontSection.appendChild(cardNumberBox);
frontSection.appendChild(flexbox);
 
// Create the back section elements
const stripeSection = document.createElement('div');
stripeSection.className = 'stripeSection';
 
const cvvBox = document.createElement('div');
cvvBox.className = 'box';
const cvvSpan = document.createElement('span');
cvvSpan.textContent = 'CVV';
const cvvValueBox = document.createElement('div');
cvvValueBox.className = 'cvvBox';
// const visaImgBack = document.createElement('img');
// visaImgBack.src = 'client//img/visa.png';
cvvBox.appendChild(cvvSpan);
cvvBox.appendChild(cvvValueBox);
// cvvBox.appendChild(visaImgBack);
 
backSection.appendChild(stripeSection);
backSection.appendChild(cvvBox);
 
// Append the card elements to the container
cardContainer.appendChild(frontSection);
cardContainer.appendChild(backSection);
 
// Add event listeners to update the card values
document.getElementById('cc-number').addEventListener('input', function() {
  if (this.value.trim() !== '') {
    cardNumberBox.textContent = this.value;
  } else {
    cardNumberBox.textContent = '################';
  }
});
 
document.getElementById('cc-name').addEventListener('input', function() {
  if (this.value.trim() !== '') {
    cardHolderName.textContent = this.value;
  } else {
    cardHolderName.textContent = 'full name';
  }
});
 
document.getElementById('cc-expiration').addEventListener('input', function() {
  const expValue = this.value.split('/');
  if (expValue[0]) {
    expMonth.textContent = expValue[0].trim();
  } else {
    expMonth.textContent = 'mm';
  }
  if (expValue[1]) {
    expYear.textContent = expValue[1].trim();
  } else {
    expYear.textContent = 'yy';
  }
});
 
document.getElementById('cc-cvv').addEventListener('input', function() {
  if (this.value.trim() !== '') {
    cvvValueBox.textContent = this.value;
  } else {
    cvvValueBox.textContent = '';
  }
});
 
document.getElementById('cc-cvv').addEventListener('mouseenter', function() {
  frontSection.style.transform = 'perspective(1000px) rotateY(-180deg)';
  backSection.style.transform = 'perspective(1000px) rotateY(0deg)';
});
 
document.getElementById('cc-cvv').addEventListener('mouseleave', function() {
  frontSection.style.transform = 'perspective(1000px) rotateY(0deg)';
  backSection.style.transform = 'perspective(1000px) rotateY(180deg)';
});
 
// function getCart() {
//   let cart = localStorage.getItem('shoppingCart')
//   //console.log(cart)
//   if (cart === null){
//       cart = []
//       console.log("inside if")
//       // localStorage.setItem('shoppingCart', JSON.stringify(cart))
//   }
 
//   else{
//       cart = JSON.parse(cart)
//       console.log("inside else")
//       console.log(cart)
 
//   }
 
//   return cart
// }
 
function showCartItems() {
  let cart = getCart();
  let tbody = document.getElementById('cartItems');
  let cartCountElement = document.getElementById('cartCount');

  tbody.innerHTML = '';


  let total = 0;
  let itemCount = 0;


  cart.forEach((item, index) => {

    let row = tbody.insertRow();


    let imgCell = row.insertCell(0);
    let img = document.createElement('img');
    img.src = item.furnitureUrl;
    img.alt = item.furnitureName;
    img.style.width = '100px'; 
    imgCell.appendChild(img);

    
    let nameCell = row.insertCell(1);
    nameCell.textContent = item.furnitureName;

   
    let priceCell = row.insertCell(2);
    if (typeof item.furniturePrice === 'number') {
      priceCell.textContent = `$${item.furniturePrice.toFixed(2)}`;
      total += item.furniturePrice;
    } else {
      priceCell.textContent = 'N/A';
    }


    let actionCell = row.insertCell(3);
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'btn btn-danger btn-sm';
    removeButton.onclick = function() {
      removeItemFromCart(index); 
    };
    actionCell.appendChild(removeButton);

  
    itemCount += (item.count || 1);
  });

  
  cartCountElement.textContent = itemCount.toString();

 
  let totalRow = tbody.insertRow();
  let totalTextCell = totalRow.insertCell(0);
  totalTextCell.textContent = 'Total';
  totalTextCell.colSpan = 3;
  let totalValueCell = totalRow.insertCell(1);
  totalValueCell.textContent = `$${total.toFixed(2)}`;
}


document.addEventListener('DOMContentLoaded', function() {
  showCartItems();
});


function getCart() {
  let cart = localStorage.getItem('shoppingCart');
  return cart ? JSON.parse(cart) : [];
}


function removeItemFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1);
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  showCartItems(); 
}
