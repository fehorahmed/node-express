import { getAll, getById, getByMake, addGuitar, saveGuitar, removeGuitar } from "./model.js";
import { view } from "./view.js";

export async function createGuitar(req, res) {
    res.send(
        view('form')
    );
}

export async function editGuitar(req, res) {
   const id = parseInt(req.params.id,10);
   if(!id){
    res.sendStatus(404);
    return;
   }

   const guitar = await getById(id);
   console.log(guitar);
   if(!guitar){
    res.sendStatus(404);
    return;
   }

    res.send(
        view('form',guitar)
    );
}
export async function deleteGuitar(req, res) {
   const id = parseInt(req.params.id,10);
   if(!id){
    res.sendStatus(404);
    return;
   }

   const guitar = await getById(id);
   console.log(guitar);
   if(!guitar){
    res.sendStatus(404);
    return;
   }

  await removeGuitar(guitar);
  res.redirect('/guitars');
}

export async function listGuitars(req, res) {
    const guitars = await getAll();
    res.send(
        view('list', { guitars, title: 'My Guitars' })
    );
}

export async function showGuitar(req, res) {
    const id = parseInt(req.params.id, 10);
    if (id) {
        const guitar = await getById(id);
        if (!guitar) {
            res.sendStatus(404);
        } else {
            res.send(
                view('show', { guitar })
            );
        }
    } else {
        const found = await getByMake(req.params.id)
        if (found.length === 0) {
            res.sendStatus(404);
        } else {

            res.send(view('list', {
                guitars: found,
                title: `Guitar made by ${found[0].make}`
            }));
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

    const id = parseInt(req.params.id,10);
    if(!id){
     res.sendStatus(404);
     return;
    }
 
    const guitar = await getById(id);
    console.log(guitar);
    if(!guitar){
     res.sendStatus(404);
     return;
    }

    console.log();
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