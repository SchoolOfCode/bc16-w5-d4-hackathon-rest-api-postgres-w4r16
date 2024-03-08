// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getCars() {
  try {
    // Define the query that will return all cars
    const queryText = `SELECT * FROM cars`;

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
  try {
    // Define the query that will return a customer with a a matching id or null
    const queryText = `SELECT * FROM cars WHERE car_id= $1`;

    // Send the query to the DB using the pool method. this will return an object which is stored in queryResult
    const queryResult = await pool.query(queryText, [id]);

    //The queryRestul object has a method called rows which contains the retrieved cars

    return queryResult.rows[0] || null;
  } catch (error) {
    console.error("Error executing query", error);
    return [];
  }
}

export async function createCar(resource) {
  // Define the query that create a new car and return the newly created car

  try {
    const queryText = `INSERT INTO cars (make, model, price) VALUES ($1, $2, $3) RETURNING *;`;
    let errorMsg = "";

    //Assign the car parameters to an array
    const queryParams = [car.make, car.model, car.price];
    let errorDisplay = [];

    if (!car.make) {
      errorDisplay.push("Car Make");
      // errorMsg = `Car make is null, please enter it correctly to complete the request`
      // return [false, errorMsg]
    }
    if (!car.model) {
      errorDisplay.push("Model");
      // errorMsg = `Model is null, please enter it correctly to complete the request`
      // return [false, errorMsg]
    }
    if (!car.price) {
      errorDisplay.push("Price");
      // errorMsg = `Price is null, please enter it correctly to complete the request`
      // return [false, errorMsg]
    }

    if (errorDisplay) {
      return [
        false,
        `${errorDisplay.join(", ")} is incorrect or missing, please enter it correctly to complete the request`,
      ];
    }

    // Send the query to the DB using the pool method. This will return an object which is stored in queryResult
    const queryResult = await pool.query(queryText, queryParams);

    //The queryRestul object has a method called rows which contains the created car

    return queryResult.rows[0] || null;
  } catch (error) {
    console.error("Error creating new car", error);
    throw error;
  }
}

export async function updateCarById(id, updates) {
  // Query the database to update the car and return the newly updated resource or null

  let queryText = `UPDATE cars SET `;
  let queryParams = [];
  let setParts = [];
  let queryParamIndex = 1;

  if (updates.name) {
    setParts.push(`name = $${queryParamIndex++}`);
    queryParams.push(updates.make);
  }
  if (updates.email) {
    setParts.push(`email = $${queryParamIndex++}`);
    queryParams.push(updates.model);
  }
  if (updates.phone) {
    setParts.push(`phone = $${queryParamIndex++}`);
    queryParams.push(updates.price);
  }

  queryText += setParts.join(", ");
  queryText += ` WHERE car_id = $${queryParamIndex++}`;

  queryParams.push(id);

  queryText += ` RETURNING *;`;

  // create try catch
  try {
    const carExists = await getCarById(id);

    if (!carExists) {
      return false;
    }

    // execute query
    const { rows } = await pool.query(queryText, queryParams);

    // return data (rows)
    return rows[0];
  } catch (error) {
    console.error("Error updating car", error);
  }
}

export async function deleteCarById(id) {
  try {
    // Define the query that will delete the car and return the deleted car or null
    const queryText = `DELETE * FROM cars WHERE car_id= $1`;

    // Send the query to the DB using the pool method. this will return an object which is stored in queryResult

    const queryResult = await pull.query(queryText, id[0]);

    //Return the message "car deleted successfully"
    return "Entry deleted successfully";
  } catch (error) {
    console.error(`Error deleting entry:`, error.message);
    throw error;
  }
}
