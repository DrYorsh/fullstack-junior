import { Pool } from 'pg';

const pool = new Pool({
    user: "postgres",
    password: "post205077",
    host: "db",
    port: 5432,
    database: "db_fullstack_junior"
});

// pool.on('connect', (client) => {
//   client.query('SET DATESTYLE = iso, mdy')
// })

export default pool;

