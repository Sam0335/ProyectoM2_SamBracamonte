import express from "express";
import {
    create,
    getAll,
    getById,
    remove,
    update,
} from "../services/authorsService.js";
import { notFound } from "../src/errorHandler.js";
import { validateAuthorCreate, validateAuthorUpdate } from "../middleware/authors.validate.js";

const authorsRouter = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

authorsRouter.get(
    "/",
    asyncHandler(async (req, res) => {
        const authors = await getAll();
        res.status(200).json(authors);
    })
);

authorsRouter.get(
    "/:id",
    asyncHandler(async (req, res, next) => {
        const author = await getById(req.params.id);
        if (!author) {
            return next(notFound("Autor no encontrado"));
        }
        res.status(200).json(author);
    })
);

authorsRouter.post(
    "/",
    validateAuthorCreate,
    asyncHandler(async (req, res) => {
        const author = await create(req.body);
        res.status(201).json(author);
    })
);

authorsRouter.put(
    "/:id",
    validateAuthorUpdate,
    asyncHandler(async (req, res, next) => {
        const author = await update(req.params.id, req.body);
        if (!author) {
            return next(notFound("Autor no encontrado"));
        }
        res.status(202).json(author);
    })
);

authorsRouter.delete(
    "/:id",
    asyncHandler(async (req, res, next) => {
        const deleted = await remove(req.params.id);
        if (!deleted) {
            return next(notFound("Autor no encontrado"));
        }
        res.status(200).json({ message: "Autor eliminado exitosamente" });
    })
);

export default authorsRouter;
