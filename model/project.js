const pool = require('../database/Db');

const getAllprojects = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM projects');
    client.release();
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};

const getprojectById = async (project_id) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM projects WHERE project_id = $1', [project_id]);
    client.release();
    return result.rows[0];
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};

const createproject = async ({ title, description, image, tech, demo_link, buy, price, created_at }) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO projects (title, description, image, tech, demo_link, buy, price, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, description, image, tech, demo_link, buy, price , created_at ]
    );
    client.release();
    return result.rows[0];
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};

const updateproject = async (project_id, { title, description, image, tech, demo_link, price }) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE projects SET title = $1, description = $2, image = $3, tech = $4, demo_link = $5, price = $6 WHERE project_id = $7 RETURNING *',
      [title, description, image, tech, demo_link, price, project_id]
    );
    client.release();
    return result.rows[0];
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};

const deleteproject = async (project_id) => {
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM projects WHERE project_id = $1', [project_id]);
    client.release();
    return result.rowCount;
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};

module.exports = {
  getAllprojects,
  getprojectById,
  createproject,
  updateproject,
  deleteproject,
};
