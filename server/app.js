const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();

app.use(bodyParser.json());
app.use(cors()); 

class Inventory {
    constructor() {
        this.items = {};
    }
    
    addItemPrice(productId,price){
        if (!productId || !price || price <= 0) {
            throw new Error('Invalid productId or price');
        }
        this.items[productId] = price;
    }

    addItem(productId, quantity) {
        if (!productId || !quantity || quantity <= 0) {
            throw new Error('Invalid productId or quantity');
        }

        if (this.items[productId]) {
            this.items[productId] += quantity;
        } else {
            this.items[productId] = quantity;
        }
    }

    removeItem(productId, quantity) {
        if (!productId || !quantity || quantity <= 0) {
            throw new Error('Invalid productId or quantity');
        }

        if (this.items[productId] && this.items[productId] >= quantity) {
            this.items[productId] -= quantity;
            if (this.items[productId] === 0) {
                delete this.items[productId];
            }
        } else {
            throw new Error('Not enough items in inventory to remove');
        }
    }

    hasItem(productId, quantity) {
        return this.items[productId] && this.items[productId] >= quantity;
    }
}

class Cart {
    constructor() {
        this.items = {};
    }

    addItem(productId, quantity) {
        if (!productId || !quantity || quantity <= 0) {
            throw new Error('Invalid productId or quantity');
        }

        if (this.items[productId]) {
            this.items[productId] += quantity;
        } else {
            this.items[productId] = quantity;
        }
    }

    calculateTotal(prices) {
        return Object.keys(this.items).reduce((total, productId) => {
            return total + (prices[productId] * this.items[productId]);
        }, 0);
    }
}

class DiscountCoupon {
    constructor(discountPercentage, maxDiscount) {
        if (discountPercentage >= 100) {
            throw new Error('Discount percentage must be less than 100.');
        }
        this.discountPercentage = discountPercentage;
        this.maxDiscount = maxDiscount;
    }

    applyDiscount(cartValue) {
        let discount = (this.discountPercentage / 100) * cartValue;
        if (discount > this.maxDiscount) {
            discount = this.maxDiscount;
        }
        return cartValue - discount;
    }
}

class InventoryManagementSystem {
    constructor() {
        this.inventory = new Inventory();
        this.carts = {};
        this.prices = {};
    }

    addItemToInventory(productId, quantity) {
        this.inventory.addItem(productId, quantity);
    }

    removeItemFromInventory(productId, quantity) {
        this.inventory.removeItem(productId, quantity);
    }

    addItemToCart(customerId, productId, quantity) {
        if (!customerId || !productId || !quantity || quantity <= 0) {
            throw new Error('Invalid customerId, productId, or quantity');
        }

        if (!this.inventory.hasItem(productId, quantity)) {
            throw new Error('Not enough inventory for product');
        }

        if (!this.carts[customerId]) {
            this.carts[customerId] = new Cart();
        }

        this.carts[customerId].addItem(productId, quantity);
        this.inventory.removeItem(productId, quantity);
    }

    applyDiscountCoupon(customerId, discountCoupon) {
        if (!customerId || !discountCoupon) {
            throw new Error('Invalid customerId or discountCoupon');
        }

        if (!this.carts[customerId]) {
            throw new Error('Cart not found for customer');
        }

        const cart = this.carts[customerId];
        const cartValue = cart.calculateTotal(this.prices);
        return discountCoupon.applyDiscount(cartValue);
    }

    addItemPrice(productId, price) {
        if (!productId || !price || price <= 0) {
            throw new Error('Invalid productId or price');
        }
        this.prices[productId] = price;
    }
}

const ims = new InventoryManagementSystem();


app.post('/addItemToInventory', (req, res) => {
    const { productId, quantity } = req.body;
    try {
        ims.addItemToInventory(productId, quantity);
        res.status(200).send('Item added to inventory');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/removeItemFromInventory', (req, res) => {
    const { productId, quantity } = req.body;
    try {
        ims.removeItemFromInventory(productId, quantity);
        res.status(200).send('Item removed from inventory');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/addItemToCart', (req, res) => {
    const { customerId, productId, quantity } = req.body;
    try {
        ims.addItemToCart(customerId, productId, quantity);
        res.status(200).send('Item added to cart');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/applyDiscountCoupon', (req, res) => {
    const { customerId, discountPercentage, maxDiscount } = req.body;
    try {
        const discountCoupon = new DiscountCoupon(discountPercentage, maxDiscount);
        const discountedPrice = ims.applyDiscountCoupon(customerId, discountCoupon);
        res.status(200).send(`Discounted price: ${discountedPrice}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/addItemPrice', (req, res) => {
    const { productId, price } = req.body;
    try {
        ims.addItemPrice(productId, price);
        res.status(200).send('Item price added');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/getAllData', (req, res) => {
    try {
        const data = {
            inventory: ims.inventory.items,
            carts: ims.carts,
            prices: ims.prices
        };
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
