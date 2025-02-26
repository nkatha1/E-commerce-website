// Initialize Stripe.js
const stripe = Stripe('your-publishable-key-here'); // Replace with your actual Stripe public key
const elements = stripe.elements();
const cardElement = elements.create('card');

// Add the card Element to your form
cardElement.mount('#card-element');

// Handle the form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get the cart data (this can be fetched from the cart API or stored locally)
    const cart = getCartData();

    // Create a payment method using Stripe Elements
    const {token, error} = await stripe.createToken(cardElement);
    if (error) {
        console.error('Error creating token:', error);
    } else {
        // Send the token and cart data to the backend for payment processing
        const response = await fetch('http://localhost:5000/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                cart: cart
            })
        });

        const data = await response.json();
        if (data.message === 'Payment successful, order created') {
            alert('Payment successful! Your order is confirmed.');
            // Optionally, redirect to a confirmation page
        } else {
            alert('Payment failed, please try again.');
        }
    }
});