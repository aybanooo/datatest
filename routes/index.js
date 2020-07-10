var express = require('express');
var router = express.Router();

//add database
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Database Test' });
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

module.exports = router;
