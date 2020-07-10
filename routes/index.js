var express = require('express');
var router = express.Router();

//add database
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

router.get('/home', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.send(JSON.stringify(results));
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Database Test' });
});

rout/*er.get('/home', function(req, res, next) {
  res.render('home');
});
*/

module.exports = router;
