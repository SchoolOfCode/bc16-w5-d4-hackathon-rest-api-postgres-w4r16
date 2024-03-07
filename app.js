// Import the required modules
import express from "express";

// Import your helper functions for cars here
// import {
//   getCars,
//   getCarById,
//   createCar,
//   updateCarById,
//   deleteCarById,
// } from "./cars.js";

// Import your helper functions for customers here
// import {
//   getCustomers,
//   getCustomerById,
//   createCustomer,
//   updateCustomerById,
//   deleteCustomerById,
// } from "./customers.js";

// Import your helper functions for orders here
// import {
//   getOrders,
//   getOrderById,
//   createOrder,
//   updateOrderById,
//   deleteOrderById,
// } from "./orders.js";

// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Cars Route Handlers

// Endpoint to retrieve all Cars
app.get("/cars/", async function (req, res) {
  console.log("I'm alive");
  res.status(200).send("I'm alive!");
});

// Endpoint to retrieve a Car by id
app.get("/cars/:id", async function (req, res) {});

// Endpoint to create a new Car
app.post("/cars/", async function (req, res) {});

// Endpoint to update a specific Car by id
app.patch("/cars/:id", async function (req, res) {});

// Endpoint to delete a specific Car by id
app.delete("/cars/:id", async function (req, res) {});

// Resource Customers Handlers

// Endpoint to retrieve all Customers
app.get("/customers/", async function (req, res) {
  const authors = await getAuthors();
  res.status(200).json({ status: "success", data: authors });
});

// Endpoint to retrieve a Customer by id
app.get("/customers/:id", async function (req, res) {});

// Endpoint to create a new Customer
app.post("/customers/", async function (req, res) {});

// Endpoint to update a specific Customer by id
app.patch("/customers/:id", async function (req, res) {});

// Endpoint to delete a specific Customer by id
app.delete("/customers/:id", async function (req, res) {});

// Resource Orders Handlers

// Endpoint to retrieve all Orders
app.get("/orders/", async function (req, res) {
  const authors = await getAuthors();
  res.status(200).json({ status: "success", data: authors });
});

// Endpoint to retrieve an Order by id
app.get("/orders/:id", async function (req, res) {});

// Endpoint to create a new Order
app.post("/orders/", async function (req, res) {});

// Endpoint to update a specific Order by id
app.patch("/orders/:id", async function (req, res) {});

// Endpoint to delete a specific Order by id
app.delete("/orders/:id", async function (req, res) {});

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
