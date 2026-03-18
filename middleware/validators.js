export function validarEmail(email) {
    if (!email) {
        return "El email es requerido";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "El formato del email es invalido";
    }
    return null;
}

export function validarNombre(nombre) {
    if (nombre === undefined || nombre === null) {
        return "El nombre es requerido";
    }
    if (typeof nombre !== "string") {
        return "El nombre debe ser un texto";
    }
    if (nombre.trim().length === 0) {
        return "El nombre no puede estar vacio";
    }
    if (nombre.trim().length < 2 || nombre.trim().length > 100) {
        return "El nombre debe tener entre 2 y 100 caracteres";
    }

    return null;
}

export function validarTitulo(titulo) {
    if (titulo === undefined || titulo === null) {
        return "El titulo es requerido";
    }
    if (typeof titulo !== "string") {
        return "El titulo debe ser un texto";
    }
    if (titulo.trim().length === 0) {
        return "El titulo no puede estar vacio";
    }
    if (titulo.trim().length < 2 || titulo.trim().length > 200) {
        return "El titulo debe tener entre 2 y 200 caracteres";
    }
    return null;
}

export function validarContenido(contenido) {
    if (contenido === undefined || contenido === null) {
        return "El contenido es requerido";
    }
    if (typeof contenido !== "string") {
        return "El contenido debe ser un texto";
    }
    if (contenido.trim().length === 0) {
        return "El contenido no puede estar vacio";
    }
    return null;
}

export function validarAuthorId(authorId) {
    if (authorId === undefined || authorId === null) {
        return "El author_id es requerido";
    }
    if (!Number.isInteger(authorId) || authorId <= 0) {
        return "El author_id debe ser un entero positivo";
    }
    return null;
}

export function validarPublished(published) {
    if (published === undefined || published === null) {
        return null;
    }
    if (typeof published !== "boolean") {
        return "El campo published debe ser boolean";
    }
    return null;
}

export function ensureNumberField(body, field) {
    if (typeof body[field] === "string") {
        const parsed = Number(body[field]);
        if (Number.isInteger(parsed)) {
            body[field] = parsed;
        }
    }
}
