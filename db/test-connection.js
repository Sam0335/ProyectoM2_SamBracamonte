import pool from "./config.js";

async function testConnection() {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("CONEXION EXITOSA");
        console.log("Hora del servidor:", result.rows[0].now);

        const authors = await pool.query("SELECT * FROM authors");
        console.log(authors.rows);
        console.log(authors.rowCount);
        console.log(authors.command);
    } catch (error) {
        console.error("ERROR CONECTANDO:", error.message);
    } finally {
        await pool.end();
    }
}

testConnection();
