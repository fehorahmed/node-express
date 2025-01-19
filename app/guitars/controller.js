import mongoose from "mongoose";
import { getAll, getById, getByMake, addGuitar, saveGuitar, removeGuitar } from "./model.js";

export async function createGuitar(req, res) {
    res.render('guitars/form');

}

export async function editGuitar(req, res) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.sendStatus(404);
        return;
    }

    const guitar = await getById(id);
    console.log(guitar);
    if (!guitar) {
        res.sendStatus(404);
        return;
    }
    res.render('guitars/form', { guitar:convertToObj(guitar), title: 'Edit Guitar' });

}
export async function deleteGuitar(req, res) {
    const id = parseInt(req.params.id, 10);
    if (!id) {
        res.sendStatus(404);
        return;
    }

    const guitar = await getById(id);
    console.log(guitar);
    if (!guitar) {
        res.sendStatus(404);
        return;
    }

    await removeGuitar(guitar);
    res.redirect('/guitars');
}

export async function listGuitars(req, res) {
    const guitars = await getAll();

    res.render('guitars/list', {
        guitars: guitars.map(convertToObj),
        title: 'Guitar List'
    });

}


export async function showGuitar(req, res) {
    const id = req.params.id;

    if (mongoose.Types.ObjectId.isValid(id)) {
        const guitar = await getById(id);
        if (!guitar) {
            res.sendStatus(404);
        } else {
            res.render('guitars/view', {
                guitar: convertToObj(guitar),
                title: `${guitar.make} ${guitar.model}`
            });
        }
    } else {
      
        const found = await getByMake(req.params.id)
        if (found.length === 0) {
            res.sendStatus(404);
        } else {

            res.render('guitars/list', {
                guitars: found.map(convertToObj),
                title: `Guitar made by ${found[0].make}`
            });

        }
    }
}
export async function storeGuitar(req, res) {
    const { guitar_make, guitar_model } = req.body;

    if (guitar_make && guitar_model) {
        await addGuitar(guitar_make, guitar_model);
        res.redirect('/guitars');
    } else {
        res.redirect('/guitars/create');
    }

}
export async function updateGuitar(req, res) {

    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.sendStatus(404);
        return;
    }

    const guitar = await getById(id);
    console.log(guitar);
    if (!guitar) {
        res.sendStatus(404);
        return;
    }

    const { guitar_make, guitar_model } = req.body;

    if (guitar_make && guitar_model) {

        guitar.make = guitar_make;
        guitar.model = guitar_model;

        await saveGuitar(guitar_make, guitar_model);
        res.redirect(`/guitars/${id}`);
    } else {
        res.redirect(`/guitars/${id}/edit`);
    }

}

const convertToObj = (g) => ({ id: g.id, make: g.make, model: g.model });