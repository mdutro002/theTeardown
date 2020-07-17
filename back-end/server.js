const express = require('express');
const session = require('express-session');
const app = express();
const {Pool, Client} = require('pg');

//MIDDLEWARE
app.set('views', __dirname + '/views');
require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 3333

//DB CONNECTION
const pool = new Pool({ 
  database: process.env.DBNAME,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT
})

const client = new Client({
  database: process.env.DBNAME,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT
})

pool.connect((err, client, release) => {
  if (err){
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows);
  })
});

//API ROUTES
//ROUTES - GET ALL REVIEWS
app.get('/', (req, res) => {
  pool.query('SELECT * FROM reviews', (err, result) => {
    if (err){
      console.log(err)
      throw err
    }
    res.json(result.rows);
  })
})

//ROUTES - GET ALL CREATORS
app.get('/creators', (req, res) => {
  pool.query('SELECT * FROM creators', (err, result) => {
    if (err){
      console.log(err)
      throw err
    }
    res.json(result.rows);
  })
})

//ROUTES - CREATE REVIEW -- NEEDS TESTING
app.post('/review', (req, res) => {
  client.connect();
  const query = 'INSERT INTO reviews (site, reviewtitle, reviewbody, creatorID) VALUES ($1, $2, $3, $4) RETURNING *';
  const params = [req.body.site, req.body.reviewtitle, req.body.reviewbody, req.body.creatorID]
  client.query(query, params).then(data => {
    res.json(data.rows[0]);
    client.end();
  })
})

//ROUTES - CREATE CREATOR
app.post('/creators', (req, res) => {
  client.connect();
  const query = 'INSERT INTO creators (first, last) VALUES ($1, $2) RETURNING *';
  const params = [req.body.firstname, req.body.lastname];
  client.query(query, params).then(data => {
    res.json(data.rows[0]);
    client.end();
  })
})

//ROUTES - UPDATE REVIEW

//ROUTES - UPDATE CREATOR

//ROUTES - DELETE REVIEW

//ROUTES - DELETE CREATOR

//LISTENER
app.listen(PORT, () => {
  console.log("listening on ", PORT);
})

//Reference the following guide when working with databases
//https://www.taniarascia.com/node-express-postgresql-heroku/