const express = require('express')
const {Pool} = require('pg');
const dotenv = require('dotenv')

dotenv.config()

const app = express();

const port = 3005;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
})

app.get('/', async (req,res) => {
	try {
		const result = await pool.query('SELECT NOW()');
		res.send(`Current time from the database is ${result.rows[0].now}`)
	} catch (err){
		console.error(err)
	}
})

app.listen(port,()=>{
	console.log(`the server is running on ${port}`)
})