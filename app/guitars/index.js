import { Router } from "express";


const guitars = [
    { id: 1, make: 'Fendal', model: 'Strat' },
    { id: 2, make: 'PRS', model: 'Starla' },
    { id: 2, make: 'PRS', model: 'Starla' },
    { id: 3, make: 'Gibson', model: 'Les Paul' },
];


export const routes = new Router();

routes.get('/', (req, res) => {
    res.send(guitars);
})
routes.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (id) {
        const guitar = guitars.find(g => g.id === id);
        if (!guitar) {
            res.send(404);
        } else {
            res.send(guitar);
        }
    }else{
        const found = guitars.filter(g=>g.make.toLowerCase()=== req.params.id.toLowerCase());
        if(found.length===0){
            res.send(404);
        }else{
            res.send(found);
        }
    }

})