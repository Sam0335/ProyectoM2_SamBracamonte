import { badRequest } from "../src/errorHandler.js";
import { validarEmail, validarNombre } from "./validators.js";

export function validateAuthorCreate(req, res, next) {
    const { name, email } = req.body;

    if (!name || !email) {
        return next(badRequest("Nombre y email son requeridos"));
    }

    const nameError = validarNombre(name);
    if (nameError) return next(badRequest(nameError));

    const emailError = validarEmail(email);
    if (emailError) return next(badRequest(emailError));

    return next();
}

export function validateAuthorUpdate(req, res, next) {
    const { name, email } = req.body;

    if (name === undefined && email === undefined && req.body.bio === undefined) {
        return next(badRequest("Debe enviar al menos un campo para actualizar"));
    }

    if (name !== undefined) {
        const nameError = validarNombre(name);
        if (nameError) return next(badRequest(nameError));
    }

    if (email !== undefined) {
        const emailError = validarEmail(email);
        if (emailError) return next(badRequest(emailError));
    }

    return next();
}
