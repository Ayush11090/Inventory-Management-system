Here's a README.md file for your Inventory Management System project:


# Inventory Management System

This project is a simple inventory management system built using Node.js and Express. It allows you to manage inventory items, their prices, and customer carts. Additionally, it supports applying discount coupons to the items in a cart.

## Features

- **Add Item to Inventory**: Add a specified quantity of a product to the inventory.
- **Remove Item from Inventory**: Remove a specified quantity of a product from the inventory.
- **Add Item Price**: Set the price of a product in the inventory.
- **Add Item to Cart**: Add a specified quantity of a product to a customer's cart.
- **Apply Discount Coupon**: Apply a discount coupon to a customer's cart.

## Requirements

- Node.js
- npm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/inventory-management-system.git
```

2. Navigate to the project server directory:

```bash
cd inventory-management-system/server
```

3. Install the dependencies:

```bash
npm install
```

4. Start the server:

```bash
node index.js
```

The server will be running at `http://localhost:3000`.

## Frontend

The project includes a simple HTML frontend for interacting with the inventory management system. Open `index.html` in your browser to use the interface.

### Frontend Features

- Add item to inventory
- Add item price
- Remove item from inventory
- Add item to cart
- Apply discount coupon
- View inventory, carts, and prices

### Usage

The frontend will fetch data from the backend every 5 seconds and update the displayed information. Use the provided input fields and buttons to perform actions such as adding items to the inventory, setting item prices, removing items from the inventory, adding items to a cart, and applying discount coupons.

## Postman Collection

You can import the following Postman collection to easily test the API endpoints:

https://www.postman.com/ayushbillade/workspace/my-workspace/collection/29080181-4fc7d17a-209a-4cea-922f-b58119a9262d?action=share&creator=29080181


## License

This project is licensed under the MIT License.
```

This README file provides comprehensive information about the project, including features, installation instructions, API endpoint details, frontend usage, and the Postman collection for testing.
