// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getSales() {
  // Query the database and return all resource ones
  const queryText = `SELECT * from sales`;
  try {
    const { rows } = await pool.query(queryText);

    return rows || null;
  } catch (error) {
    console.error(`Unable to get all sales: ${error}`);
  }
}

export async function getSaleById(id) {
  // Query the database and return the resource with a matching id or null
  const queryText = `SELECT * FROM sales WHERE sale_id = $1`;
  try {
    const { rows } = await pool.query(queryText, [id]);

    return rows[0] || null;
  } catch (error) {
    console.error(`Unable to get sale by id: ${error}`);
  }
}

// Query the database to create an resource and return the newly created resource
export async function createSale(sale) {
  // Define the SQL query to insert a new sale into the table
  const queryText = `
    INSERT INTO sales (sale_date, sale_price)
    VALUES ($1, $2)
    RETURNING *;
    `;
  let errorMsg = "";

  console.log(queryText);

  // Assign params to an array
  const queryParams = [sale.sale_date, sale.sale_price];

  let errorDisplay = [];
  try {
    if (!sale.sale_date) {
      errorDisplay.push("Sale Date");
    }
    if (!sale.sale_price) {
      errorDisplay.push("Sale Price");
    }

    if (errorDisplay.length > 0) {
      return [
        false,
        `${errorDisplay.join(
          ", "
        )} is incorrect or missing, please enter it correctly to complete the request`,
      ];
    }

    // execute the query
    const { rows } = await pool.query(queryText, queryParams);
    // return rows;
    return [true, rows[0]];
  } catch (error) {
    console.error("Error creating new sale", error);
    throw error;
  }
}

export async function updateSaleById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null

  let queryText = `UPDATE sales SET `;
  let queryParams = [];
  let setParts = [];
  let queryParamIndex = 1;

  if (updates.sale_date) {
    setParts.push(`sale_date = $${queryParamIndex++}`);
    queryParams.push(updates.sale_date);
  }

  if (updates.sale_price) {
    setParts.push(`sale_price = $${queryParamIndex++}`);
    queryParams.push(updates.sale_price);
  }

  queryText += setParts.join(", ");
  queryText += ` WHERE sale_id = $${queryParamIndex++}`;

  queryParams.push(id);

  queryText += ` RETURNING *;`;

  console.log(queryText);

  // create try catch
  try {
    const saleExists = await getSaleById(id);

    if (!saleExists) {
      return false;
    }

    // execute query
    const { rows } = await pool.query(queryText, queryParams);

    // return data (rows)
    return rows[0];
  } catch (error) {
    console.error("Error updating sale", error);
  }
}

export async function deleteSaleById(id) {
  // Query the database to delete the resource and return the deleted resource or null

  const selectQuery = `SELECT * FROM customers WHERE customer_id = $1`;

  try {
    // Check if customer exists
    const selectResult = await pool.query(selectQuery, [id]);

    const sale = selectResult.rows[0];

    if (!sale) {
      return null;
    }

    const deleteQuery = `
    DELETE FROM sales
    WHERE sale_id = $1
    `;

    await pool.query(deleteQuery, [id]);

    return customer;
  } catch (error) {
    console.error("Error deleting customer", error);
    throw error;
  }
}
