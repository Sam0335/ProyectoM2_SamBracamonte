import express from "express";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import authorsRouter from "./routes/authors.routes.js";
import postsRouter from "./routes/posts.routes.js";
import { errorHandler, notFound } from "./error/errorHandler.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openApiPath = path.join(__dirname, "OpenAPI.yaml");
const openApiDoc = YAML.parse(readFileSync(openApiPath, "utf8"));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'Blog API v2.0',
    endpoints: {
      authors: '/api/authors',
      posts: '/api/posts',
      docs: '/api-docs'
    }
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));
app.use("/api/authors", authorsRouter);
app.use("/api/posts", postsRouter);

app.use("/", (req, res, next) => {
    next(notFound(`No se encontro la ruta ${req.method} ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
