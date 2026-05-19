const {text} = require('express');
const {Pool} = require ('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL){
  console.error('DATABASE_URL não definida!');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false}
});

pool.on('error', (err) => {
  console.error('Erro no pool de conexão: ', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};