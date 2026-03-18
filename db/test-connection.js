import pool from "./config.js";

async function testConnection() {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("CONEXION EXITOSA");
        console.log("Hora del servidor:", result.rows[0].now);
        await pool.end();
    } catch (error) {
        console.error("ERROR CONECTANDO:", error.message);
    }
}

testConnection();

const result = await pool.query("SELECT * FROM authors");
console.log(result.rows);
console.log(result.rowCount);
console.log(result.command);
