
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getCars() {
  try {
    // Define the query that will return all cars
    const queryText = `SELECT * FROM Cars`;

    // Send the query to the DB using the pool method. this will return an object which is stored in queryResult
    const queryResult = await pool.query(queryText);

    //The queryRestul object has a method called rows which contains the retrieved cars

    return queryResult.rows;

  } catch (error) {
    console.error("Error executing query", error);
    return [];
  }
}

export async function getCarById(id) {

  try{
  // Define the query that will return a customer with a a matching id or null
    const queryText = `SELECT * FROM customers WHERE customer_id= $1`;

    // Send the query to the DB using the pool method. this will return an object which is stored in queryResult
    const queryResult = await pool.query(queryText, [id]);

    //The queryRestul object has a method called rows which contains the retrieved cars

    return queryResult.rows[0] || null

    }
     catch (error) {
    console.error("Error executing query", error);
    return [];
  }
}

export async function createCar(resource) {
  
  // Define the query that create a new car and return the newly created car
  const queryText = `INSERT INTO Cars (make, model, price) VALUES ($1, $2, $3) RETURNING *;`
  let errorMsg = "";

  //Assign the car parameters to an array
  const queryParams =[car.make, car.model, car.price];
  let errorDisplay = []

try {
      if (!car.make) {
        errorDisplay.push('Car Make')
        // errorMsg = `Car make is null, please enter it correctly to complete the request`
        // return [false, errorMsg]
      } if (!car.model) {
        errorDisplay.push('Model')
        // errorMsg = `Model is null, please enter it correctly to complete the request`
        // return [false, errorMsg]
      } if (!car.price) {
        errorDisplay.push('Price')
        // errorMsg = `Price is null, please enter it correctly to complete the request`
        // return [false, errorMsg]
      }
      
      if (errorDisplay) {
      return [false, `${errorDisplay.join(', ')} is incorrect or missing, please enter it correctly to complete the request`]
      }
  
      // Send the query to the DB using the pool method. This will return an object which is stored in queryResult
      const queryResult = await pool.query(queryText, queryParams);

//The queryRestul object has a method called rows which contains the created car

return queryResult.rows[0] || null

  catch (error) {
      console.error("Error creating new car", error);
      throw error;
    }
}
}

export async function updateResourceThreeById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deleteResourceThreeById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}