// Import the required modules
import express from "express";



// Import your helper functions for your first resource here
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
} from "./customers.js";


// Import your helper functions for your second resource here
// import {
//   getSales,
//   getSaleById,
//   createSale,
//   updateSaleById,
//   deleteSaleById,
// } from "./sales.js";


// Import your helper functions for your second resource here
// import {
//   getCars,
//   getCarById,
//   createCar,
//   updateCarById,
//   deleteCarById,
// } from "./cars.js";



// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests




// Resource One Route Handlers

// Endpoint to retrieve all <resource_one>
app.get("/customers/", async function (req, res) {
  const customers = await getCustomers();
  res.status(200).json({status: "success", payload: customers})
});

// Endpoint to retrieve a <resource_one> by id
app.get("/customers/:id", async function (req, res) {
  const id = req.params.id;
  const customer = await getCustomerById(id);
  if(!customer) {
    res.status(400).json({status: "fail", payload: {msg: "Couldn't find customer with that id"}})
  }
  res.status(200).json({status: "success", payload: customer})
});

// Endpoint to create a new <resource_one>
app.post("/customers/", async function (req, res) {
  const data = req.body
  const customer = await createCustomer(data);
  if(!customer[0]) {
    res.status(404).json({status: "fail", payload: {msg: `Couldn't create customer: ${customer[1]}`}})
  }
  res.status(200).json({status: "success", payload: customer[1]})
});

// Endpoint to update a specific <resource_one> by id
app.patch("/customers/:id", async function (req, res) {
});

// Endpoint to delete a specific <resource_one> by id
app.delete("/customers/:id", async function (req, res) {
});




// Resource Two Route Handlers

// Endpoint to retrieve all <resource_twos>
app.get("/sales/", async function (req, res) {
    const authors = await getAuthors();
    res.status(200).json({ status: "success", data: authors });
  });
  
  // Endpoint to retrieve a <resource_twos> by id
  app.get("/sales/:id", async function (req, res) {
  });
  
  // Endpoint to create a new <resource_twos>
  app.post("/sales/", async function (req, res) {
  });
  
  // Endpoint to update a specific <resource_twos> by id
  app.patch("/sales/:id", async function (req, res) {
  });
  
  // Endpoint to delete a specific <resource_twos> by id
  app.delete("/sales/:id", async function (req, res) {
  });



  // Resource Three Route Handlers

// Endpoint to retrieve all <resource_Threes>
app.get("/cars/", async function (req, res) {
  const authors = await getAuthors();
  res.status(200).json({ status: "success", data: authors });
});

// Endpoint to retrieve a <resource_Threes> by id
app.get("/cars/:id", async function (req, res) {
});

// Endpoint to create a new <resource_Threes>
app.post("/cars/", async function (req, res) {
});

// Endpoint to update a specific <resource_Threes> by id
app.patch("/cars/:id", async function (req, res) {
});

// Endpoint to delete a specific <resource_Threes> by id
app.delete("/cars/:id", async function (req, res) {
});





// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});