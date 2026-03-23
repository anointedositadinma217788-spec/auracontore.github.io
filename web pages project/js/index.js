// Cart management using localStorage
let cart = JSON.parse(localStorage.getItem('auraCart')) || [];

function saveCart() {
  localStorage.setItem('auraCart', JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  alert(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  displayCart(); // if on cart page
}

function getCart() {
  return cart;
}

function clearCart() {
  cart = [];
  saveCart();
}

// Calculate total
function cartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
}

// Display cart on checkout page
function displayCart() {
  const cartTable = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  if (!cartTable) return;

  if (cart.length === 0) {
    cartTable.innerHTML = '<tr><td colspan="5" style="text-align:center;">Your cart is empty.</td></tr>';
    cartTotalSpan.textContent = '0.00';
    return;
  }

  let html = '';
  cart.forEach(item => {
    html += `
      <tr>
        <td><img src="${item.image}" alt="${item.name}" width="60" height="60" style="border-radius:8px;"></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>${item.quantity}</td>
        <td><button class="btn" onclick="removeFromCart(${item.id})">Remove</button></td>
      </tr>
    `;
  });
  cartTable.innerHTML = html;
  cartTotalSpan.textContent = cartTotal();
}

// On page load, if we're on checkout, display cart
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-items')) {
    displayCart();
  }
});