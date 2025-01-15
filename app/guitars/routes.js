import { Router } from "express";
import { createGuitar, listGuitars, showGuitar, storeGuitar } from "./controller.js";
export const routes = new Router();


routes.get('/',listGuitars);
routes.get('/create', createGuitar);
routes.post('/', storeGuitar);
routes.get('/:id', showGuitar);

