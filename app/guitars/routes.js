import { Router } from "express";
import { createGuitar, deleteGuitar, editGuitar, listGuitars, showGuitar, storeGuitar, updateGuitar } from "./controller.js";
export const routes = new Router();


routes.get('/',listGuitars);
routes.get('/create', createGuitar);
routes.post('/', storeGuitar);
routes.get('/:id', showGuitar);
routes.get('/:id/edit', editGuitar);
routes.post('/:id', updateGuitar);

routes.get('/:id/delete', deleteGuitar);

