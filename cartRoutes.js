const express = require('express');
const router = express.Router();

// Temporary in-memory cart for the demo
let cart = [];

// Add to cart
router.post('/add', (req, res) => {
    const { productId, quantity, price } = req.body;
    const existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ productId, quantity, price });
    }

    res.json({ message: 'Product added to cart', cart });
});

// View cart
router.get('/', (req, res) => {
    res.json(cart);
});

module.exports = router;