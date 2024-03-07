// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

// 1
export async function getCars() {
  try {
    // Define the SQL query that will return all cars
    const queryText = `SELECT * FROM Cars`;

    // Send the query to the DB using the pool object
    const queryResult = await pool.query(queryText);

    //The queryRestul object has a method called rows which contains the retrieved cars
    return queryResult.rows;
  } catch (error) {
    console.error("Error executing query", error);
    return [];
  }
}

export async function getCarById(id) {
  // Query the database and return the resource with a matching id or null
}

export async function createCar(resource) {
  // Query the database to create an resource and return the newly created resource
}

export async function updateCarById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deleteCarById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}
