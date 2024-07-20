const { Pool } = require('pg');

const pool = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // database: 'BlogAllNotes',
    // password: 'Sachin@414',
    DB_USER:'my_blog_database_8oh3_user',
    DB_HOST:'dpg-cq8chjij1k6c73chv56g-a',
    DB_DATABASE:'my_blog_database_8oh3',
    DB_PASSWORD:'nSDyJn7S3wjPDS4bnHjtXdEurqommpFL',
    port: 5432,
    jwtSecret: 'your_secure_jwt_secret',

  })

module.exports = pool;

