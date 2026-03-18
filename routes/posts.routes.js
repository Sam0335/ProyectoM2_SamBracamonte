import express from "express";
import {
    create,
    getAll,
    getByAuthor,
    getById,
    remove,
    update,
} from "../services/postsService.js";
import { notFound } from "../src/errorHandler.js";
import { validatePostCreate, validatePostUpdate } from "../middleware/posts.validate.js";

const postsRouter = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

postsRouter.get(
    "/",
    asyncHandler(async (req, res) => {
        const { published } = req.query;
        const filter = published !== undefined ? published === "true" : undefined;
        const posts = await getAll({ published: filter });
        res.status(200).json(posts);
    })
);

postsRouter.get(
    "/author/:authorId",
    asyncHandler(async (req, res, next) => {
        const posts = await getByAuthor(req.params.authorId);
        if (posts.length === 0) {
            return next(notFound("No se encontraron posts de ese autor"));
        }
        res.status(200).json(posts);
    })
);

postsRouter.get(
    "/:id",
    asyncHandler(async (req, res, next) => {
        const post = await getById(req.params.id);
        if (!post) {
            return next(notFound("Post no encontrado"));
        }
        res.status(200).json(post);
    })
);

postsRouter.post(
    "/",
    validatePostCreate,
    asyncHandler(async (req, res) => {
        const post = await create(req.body);
        res.status(201).json(post);
    })
);

postsRouter.put(
    "/:id",
    validatePostUpdate,
    asyncHandler(async (req, res, next) => {
        const post = await update(req.params.id, req.body);
        if (!post) {
            return next(notFound("Post no encontrado"));
        }
        res.status(200).json(post);
    })
);

postsRouter.delete(
    "/:id",
    asyncHandler(async (req, res, next) => {
        const deleted = await remove(req.params.id);
        if (!deleted) {
            return next(notFound("Post no encontrado"));
        }
        res.status(200).json({ message: "Post eliminado exitosamente" });
    })
);

export default postsRouter;
