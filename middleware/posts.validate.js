import { badRequest } from "../src/errorHandler.js";
import {
    ensureNumberField,
    validarAuthorId,
    validarContenido,
    validarPublished,
    validarTitulo,
} from "./validators.js";

export function validatePostCreate(req, res, next) {
    ensureNumberField(req.body, "author_id");

    const { author_id, title, content, published } = req.body;

    if (!author_id || !title || !content) {
        return next(badRequest("Author_id, titulo y contenido son requeridos"));
    }

    const authorError = validarAuthorId(author_id);
    if (authorError) return next(badRequest(authorError));

    const titleError = validarTitulo(title);
    if (titleError) return next(badRequest(titleError));

    const contentError = validarContenido(content);
    if (contentError) return next(badRequest(contentError));

    const publishedError = validarPublished(published);
    if (publishedError) return next(badRequest(publishedError));

    return next();
}

export function validatePostUpdate(req, res, next) {
    const { title, content, published } = req.body;

    if (title === undefined && content === undefined && published === undefined) {
        return next(badRequest("Debe enviar al menos un campo para actualizar"));
    }

    if (title !== undefined) {
        const titleError = validarTitulo(title);
        if (titleError) return next(badRequest(titleError));
    }

    if (content !== undefined) {
        const contentError = validarContenido(content);
        if (contentError) return next(badRequest(contentError));
    }

    if (published !== undefined) {
        const publishedError = validarPublished(published);
        if (publishedError) return next(badRequest(publishedError));
    }

    return next();
}
