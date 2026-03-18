import express from "express";
import authorsRouter from "./routes/authors.routes.js";
import postsRouter from "./routes/posts.routes.js";
import { errorHandler, notFound } from "./src/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api/authors", authorsRouter);
app.use("/api/posts", postsRouter);

app.use("/", (req, res, next) => {
    next(notFound(`No se encontro la ruta ${req.method} ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
