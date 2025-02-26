// Add to Cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Get product information from the button's data attributes
        const productId = this.getAttribute('data-product-id');
        const productName = this.getAttribute('data-product-name');
        const price = parseFloat(this.getAttribute('data-product-price'));

        // Get the current cart from localStorage, or initialize it if empty
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.productId === productId);
        if (existingProductIndex >= 0) {
            // If the product exists, increase the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If it's a new product, add it to the cart
            cart.push({
                productId: productId,
                name: productName,
                price: price,
                quantity: 1
            });
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Optionally, update the cart UI (show cart summary or item count)
        updateCartView(cart);
    });
});

// Function to update the cart view (simple display of items in cart)
function updateCartView(cart) {
    const cartContent = document.getElementById('cart-content');
    const cartCount = document.getElementById('cart-count');
    
    // Clear previous cart contents
    cartContent.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
        `;
        cartContent.appendChild(cartItem);
    });

    // Update cart item count
    cartCount.innerText = cart.length;

    // Update total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalElement = document.createElement('p');
    totalElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
    cartContent.appendChild(totalElement);
}

// Function to open the cart modal
function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartView(cart);
}

// Function to close the cart modal
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Function to checkout
function checkout() {
    // For now, simply alert the user and redirect them to checkout
    alert('Proceeding to checkout...');
    window.location.href = 'checkout.html';  // Redirect to checkout page
}

// Attach the cart modal to the cart icon click
document.getElementById('cart-icon').addEventListener('click', openCart);