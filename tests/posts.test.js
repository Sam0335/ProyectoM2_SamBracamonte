import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

async function createAuthor() {
	const response = await request(app)
		.post("/api/authors")
		.send({ name: "Autor Posts", email: `posts_${Date.now()}@example.com`, bio: "test" });
	return response.body;
}

async function createPost(authorId) {
	const response = await request(app)
		.post("/api/posts")
		.send({ author_id: authorId, title: "Titulo Test", content: "Contenido Test", published: true });
	return response.body;
}

describe("GET /posts", () => {
	test("devuelve lista de posts (puede estar vacia)", async () => {
		const response = await request(app).get("/api/posts");

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});
});

describe("GET /posts/:id", () => {
	test("devuelve post existente", async () => {
		const author = await createAuthor();
		const post = await createPost(author.id);

		const response = await request(app).get(`/api/posts/${post.id}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("id", post.id);
		expect(response.body).toHaveProperty("title");
	});

	test("devuelve 404 para post inexistente", async () => {
		const response = await request(app).get("/api/posts/-1");

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toContain("no encontrado");
	});
});

describe("GET /posts/author/:authorId", () => {
	test("devuelve posts del autor", async () => {
		const author = await createAuthor();
		await createPost(author.id);

		const response = await request(app).get(`/api/posts/author/${author.id}`);

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});
});

describe("POST /posts", () => {
	test("crea post con datos validos", async () => {
		const author = await createAuthor();

		const response = await request(app)
			.post("/api/posts")
			.send({ author_id: author.id, title: "Nuevo Post", content: "Contenido", published: false });

		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.title).toBe("Nuevo Post");
	});

	test("rechaza request sin author_id", async () => {
		const response = await request(app)
			.post("/api/posts")
			.send({ title: "Nuevo Post", content: "Contenido" });

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("error");
	});
});

describe("PUT /posts/:id", () => {
	test("actualiza post existente", async () => {
		const author = await createAuthor();
		const post = await createPost(author.id);

		const response = await request(app)
			.put(`/api/posts/${post.id}`)
			.send({ title: "Titulo Actualizado" });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("id", post.id);
		expect(response.body.title).toBe("Titulo Actualizado");
	});
});

describe("DELETE /posts/:id", () => {
	test("elimina post existente", async () => {
		const author = await createAuthor();
		const post = await createPost(author.id);

		const response = await request(app).delete(`/api/posts/${post.id}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("message");
	});
});

describe("Rutas inexistentes", () => {
	test("devuelve 404 para ruta desconocida", async () => {
		const response = await request(app).get("/api/unknown");

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty("error");
	});
});
