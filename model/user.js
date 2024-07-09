const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const pool = require('../database/Db'); 

const createUser = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required');
  }

  const client = await pool.connect();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

const getUserByEmail = async (email) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = { createUser, getUserByEmail };
