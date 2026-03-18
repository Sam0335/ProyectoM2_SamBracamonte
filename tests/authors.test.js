import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

async function createAuthor() {
	const response = await request(app)
		.post("/api/authors")
		.send({ name: "Autor Test", email: `autor_${Date.now()}@example.com`, bio: "test" });
	return response.body;
}

describe("GET /authors", () => {
	test("devuelve lista de autores (puede estar vacia)", async () => {
		const response = await request(app).get("/api/authors");

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});
});

describe("GET /authors/:id", () => {
	test("devuelve autor existente", async () => {
		const author = await createAuthor();

		const response = await request(app).get(`/api/authors/${author.id}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("id", author.id);
		expect(response.body).toHaveProperty("name");
	});

	test("devuelve 404 para autor inexistente", async () => {
		const response = await request(app).get("/api/authors/-1");

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toContain("no encontrado");
	});
});

describe("POST /authors", () => {
	test("crea usuario con datos validos", async () => {
		const response = await request(app)
			.post("/api/authors")
			.send({ name: "Juana Rodriguez", email: `juana_${Date.now()}@example.com`, bio: "testeo 123" });

		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.name).toBe("Juana Rodriguez");
	});

	test("rechaza request sin nombre", async () => {
		const response = await request(app)
			.post("/api/authors")
			.send({ email: "juana@example.com" });

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toContain("requerido");
	});

	test("rechaza request vacio", async () => {
		const response = await request(app).post("/api/authors").send({});

		expect(response.statusCode).toBe(400);
	});
});

describe("PUT /authors/:id", () => {
	test("actualiza autor existente", async () => {
		const author = await createAuthor();

		const response = await request(app)
			.put(`/api/authors/${author.id}`)
			.send({ name: "Autor Actualizado" });

		expect(response.statusCode).toBe(202);
		expect(response.body).toHaveProperty("id", author.id);
		expect(response.body.name).toBe("Autor Actualizado");
	});
});

describe("DELETE /authors/:id", () => {
	test("elimina autor existente", async () => {
		const author = await createAuthor();

		const response = await request(app).delete(`/api/authors/${author.id}`);

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




