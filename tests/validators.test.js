import { describe, test, expect } from "vitest";

import { validarEmail, validarNombre } from "../middleware/validators.js";

describe("validarEmail", () => {
    test("acepta email valido", () => {
        expect(validarEmail("test@gmail.com")).toBe(null);
    });
    test("rechaza email sin @", () => {
        expect(validarEmail("testgmail.com")).toContain("invalido");
    });
    test("rechaza email vacio", () => {
        expect(validarEmail("")).toContain("requerido");
    });
    test("rechaza email null", () => {
        expect(validarEmail(null)).toContain("requerido");
    });
    test("rechaza email sin dominio", () => {
        expect(validarEmail("test@")).toContain("invalido");
    });
});

describe("validarNombre", () => {
    test("acepta nombre valido", () => {
        expect(validarNombre("Juan Perez")).toBe(null);
    });
    test("rechaza nombre undefined", () => {
        expect(validarNombre(undefined)).toContain("requerido");
    });
    test("rechaza nombre vacio", () => {
        expect(validarNombre("")).toContain("vacio");
    });
    test("rechaza solo espacios", () => {
        expect(validarNombre("  ")).toContain("vacio");
    });
    test("rechaza nombre de 1 caracter", () => {
        expect(validarNombre("J")).toContain("entre 2 y 100");
    });
    test("rechaza nombre que no es string", () => {
        expect(validarNombre(123)).toContain("texto");
    });
});
