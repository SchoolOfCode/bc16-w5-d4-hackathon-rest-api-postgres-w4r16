// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getCustomers() {
  try {
    // Define the query that will return all customers
    const queryText = `SELECT * FROM customers`;

    // Send the query to the DB using the pool method. this will return an object which is stored in queryResult
    const queryResult = await pool.query(queryText);

    //The queryRestul object has a method called rows which contains the retrieved cars
    return queryResult.rows;
  } catch (error) {
    console.error("Error executing query", error);
    return [];
  }
}

export async function getCustomerById(id) {
  // Query the database and return the resource with a matching id or null
}

export async function createCustomer(resource) {
  // Query the database to create an resource and return the newly created resource
}

export async function updateCustomerById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deleteCustomerById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}
