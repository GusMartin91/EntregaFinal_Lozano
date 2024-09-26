import { Router } from "express";
import { misRespuestas } from "../middlewares/respuestas.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";
import { processCallbacks } from "../middlewares/processCallbacks.middleware.js"; 

export class CustomRouter {
    #router;

    constructor() {
        this.#router = Router();
        this.init();
    }

    init() {
    }

    getRouter() {
        return this.#router;
    }

    get(ruta, permisos, ...funciones) {
        this.#router.get(ruta, misRespuestas, auth(permisos), processCallbacks(funciones));
    }

    post(ruta, permisos, ...funciones) {
        this.#router.post(ruta, misRespuestas, auth(permisos), processCallbacks(funciones));
    }

    put(ruta, permisos, ...funciones) {
        this.#router.put(ruta, misRespuestas, auth(permisos), processCallbacks(funciones));
    }

    delete(ruta, permisos, ...funciones) {
        this.#router.delete(ruta, misRespuestas, auth(permisos), processCallbacks(funciones));
    }
}
