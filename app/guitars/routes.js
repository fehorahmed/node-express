import { Router } from "express";
import { createGuitar, deleteGuitar, editGuitar, listGuitars, showGuitar, storeGuitar, updateGuitar } from "./controller.js";
import { checkAuth } from "../auth/controller.js";
export const routes = new Router();


routes.get('/',checkAuth,listGuitars);
routes.get('/create',checkAuth, createGuitar);
routes.post('/',checkAuth, storeGuitar);
routes.get('/:id',checkAuth, showGuitar);
routes.get('/:id/edit',checkAuth, editGuitar);
routes.post('/:id',checkAuth, updateGuitar);

routes.get('/:id/delete',checkAuth, deleteGuitar);

