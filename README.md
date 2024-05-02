# E-Commerce Payment Gateway using SSLCommerz

This is a Node.js application that demonstrates an e-commerce payment gateway using SSLCommerz. The application uses Express.js for the server, MongoDB as the database, and SSLCommerz for payment processing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [License](#license)

## Installation

To install the required dependencies, run the following command:

```bash
npm install
```

## Usage

To start the server, run the following command:

```bash
npm start
```

The server will start on port 3001.

## Environment Variables

The following environment variables are required:

```MONGODB_CONNECTION: The MongoDB connection string.
STORE_ID: The SSLCommerz store ID.
 STORE_PASSWD: The SSLCommerz store password.
 IS_LIVE: A boolean indicating whether the application is in live mode.
 API Endpoints
```

## Following steps 
The following API endpoints are available:
```
POST /payment: Initiates a payment request.
POST /payment/success/:trans_id: Handles successful payments.
POST /payment/fail/:trans_id: Handles failed payments.
GET /order-details/:userId: Retrieves order details for a user.
```
Database Schema
The application uses MongoDB as the database. The following collections are used:

product: Stores product information.
order: Stores order information.

### License

## This project is licensed under the MIT License.

 
