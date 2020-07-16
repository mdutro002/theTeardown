const express = require('express');
const session = require('express-session');
const app = express();
const {Pool} = require('pg');

const PORT = process.env.PORT || 3333


//MIDDLEWARE
app.set('views', __dirname + '/views');

//CONTROLLERS

//ROUTES
app.get('/', (req, res) => {
  res.render('index')
})

//DB CONNECTION
const pool = new Pool({ 
  ssl: { rejectUnauthorized: false },
  database: process.env.DBNAME
})
pool.connect();


//LISTENER
app.listen(PORT, () => {
  console.log("listening on ", PORT);
})

//Reference the following guide when working with databases
//https://www.taniarascia.com/node-express-postgresql-heroku/