
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getCustomers() {
  // Query the database and return all resource ones
  const queryText = `SELECT * from customers`
  try {
    const { rows } = await pool.query(queryText);

    return rows || null;
  }
  catch (error) {
    console.error(`Unable to get all customers: ${error}`)
  }
}

export async function getCustomerById(id) {
  // Query the database and return the resource with a matching id or null
  const queryText = `SELECT * FROM customers WHERE customer_id = $1`
  try {
    const { rows } = await pool.query(queryText, [id]);

    return rows[0] || null
  }
  catch (error) {
    console.error(`Unable to get customer by id: ${error}`)
  }
}

export async function createCustomer(customer) {
  // Query the database to create an resource and return the newly created resource

  // Define the SQL query to insert a new customer into the table
  const queryText = `
    INSERT INTO customers (name, email, phone)
    VALUES ($1, $2, $3)
    RETURNING *;
    `

    let errorMsg = "";

    // Assign params to an array
    const queryParams = [customer.name, customer.email, customer.phone];
    
    try {
      if (!customer.name) {
        errorMsg = `customer name is null, please enter it correctly to complete the request`
        return [false, errorMsg]
      } else if (!customer.email) {
        errorMsg = `email is null, please enter it correctly to complete the request`
        return [false, errorMsg]
      } else if (!customer.phone) {
        errorMsg = `phone is null, please enter it correctly to complete the request`
        return [false, errorMsg]
      }
      
      // execute the query
      const { rows } = await pool.query(queryText, queryParams)
  
      // return rows;
      return [true, rows[0]];
    }
    catch (error) {
      console.error("Error creating new customer", error);
      throw error;
    }
}

export async function updateCustomerById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deleteCustomerById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}