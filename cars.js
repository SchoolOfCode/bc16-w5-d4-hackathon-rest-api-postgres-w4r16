
// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getResourceThree() {
  // Query the database and return all resource Threes
}

export async function getResourceThreeById(id) {
  // Query the database and return the resource with a matching id or null
}

export async function createResourceThree(resource) {
  // Query the database to create an resource and return the newly created resource
}

export async function updateResourceThreeById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
}

export async function deleteResourceThreeById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}