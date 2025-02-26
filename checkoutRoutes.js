const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const router = express.Router();

// Checkout route (Stripe payment processing)
router.post('/', async (req, res) => {
    const { cart, token } = req.body;

    // Calculate the total amount from the cart (sum of prices * quantities)
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    try {
        // Create a charge with Stripe
        const charge = await stripe.charges.create({
            amount: totalAmount * 100, // Stripe expects the amount in cents
            currency: 'usd',
            description: 'E-commerce Payment',
            source: token.id // Token received from the frontend
        });

        // If payment is successful, create an order in the database
        const newOrder = new Order({
            userId: 'sampleUser', // You can replace with actual user ID if using authentication
            products: cart,
            totalAmount,
            paymentStatus: 'Paid',
            orderStatus: 'Processing'
        });

        await newOrder.save();

        // Respond back with success message
        res.json({
            message: 'Payment successful, order created',
            order: newOrder
        });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Payment failed', error });
    }
});

module.exports = router;