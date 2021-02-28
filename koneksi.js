var {Pool, Client} = require('pg');
const connectionString = 'postgressql://postgres:postgres@localhost:5432/dbrestapi';

const client = new Client({
    connectionString: connectionString
});

client.connect((err) => {
    if(err) throw err;
    console.log('postgres terkoneksi')
});

//buat koneksi
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'dbrestapi',
//     password: 'postgres',
//     port: 5432
// });

module.exports = client;