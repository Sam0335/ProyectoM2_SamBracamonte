import pool from "../db/config.js";
import { conflict } from "../error/errorHandler.js";

export async function getAll() {
    const result = await pool.query("SELECT * FROM authors ORDER BY name");
    return result.rows;
}

export async function getById(id) {
    const result = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);
    return result.rows[0] || null;
}

export async function create({ name, email, bio }) {
    try {
        const result = await pool.query(
            "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bio || null]
        );
        return result.rows[0];
    } catch (error) {
        if (error.code === "23505") {
            throw conflict("Ya existe un autor con ese email");
        }
        throw error;
    }
}

export async function update(id, { name, email, bio }) {
    try {
        const result = await pool.query(
            `UPDATE authors
            SET name = COALESCE($1, name),
                email = COALESCE($2, email),
                bio = COALESCE($3, bio)
            WHERE id = $4
            RETURNING *`,
            [name, email, bio, id]
        );
        return result.rows[0] || null;
    } catch (error) {
        if (error.code === "23505") {
            throw conflict("Ya existe un autor con ese email");
        }
        throw error;
    }
}

export async function remove(id) {
    const result = await pool.query("DELETE FROM authors WHERE id = $1", [id]);
    return result.rowCount;
}
