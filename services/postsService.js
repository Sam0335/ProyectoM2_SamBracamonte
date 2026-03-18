import pool from "../db/config.js";
import { notFound } from "../error/errorHandler.js";

export async function getAll({ published } = {}) {
    let query = "SELECT * FROM posts";
    const params = [];

    if (published !== undefined) {
        query += " WHERE published = $1";
        params.push(published);
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);
    return result.rows;
}

export async function getById(id) {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    return result.rows[0] || null;
}

export async function getByAuthor(authorId) {
    const result = await pool.query(
        "SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC",
        [authorId]
    );
    return result.rows;
}

export async function create({ author_id, title, content, published }) {
    try {
        const result = await pool.query(
            "INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *",
            [author_id, title, content, published || false]
        );
        return result.rows[0];
    } catch (error) {
        if (error.code === "23503") {
            throw notFound("El autor especificado no existe");
        }
        throw error;
    }
}

export async function update(id, { title, content, published }) {
    const result = await pool.query(
        `UPDATE posts
        SET title = COALESCE($1, title),
            content = COALESCE($2, content),
            published = COALESCE($3, published)
        WHERE id = $4
        RETURNING *`,
        [title, content, published, id]
    );
    return result.rows[0] || null;
}

export async function remove(id) {
    const result = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    return result.rowCount;
}
