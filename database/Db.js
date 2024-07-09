const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'BlogAllNotes',
    password: 'Sachin@414',
    port: 5432,
    jwtSecret: 'your_secure_jwt_secret',

  })

module.exports = pool;

