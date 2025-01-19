import mongoose, { model } from "mongoose";

const guitarSchema = new mongoose.Schema({
    make:String,
    model:String,
    make_lower:String
});

const Guitar = mongoose.model('Guitar',guitarSchema);

// const guitar = new Guitar({
//     make:"TanjGitar",
//     model:"Tan Model",
//     make_lower:"tanjgitar"
// });

// guitar.save();

let id = 1;
function getId() {
    return id++;
}

const guitars = [
    { id: getId(), make: 'Fendal', model: 'Strat' },
    { id: getId(), make: 'PRS', model: 'Starla' },
    { id: getId(), make: 'PRS', model: 'Starla' },
    { id: getId(), make: 'Gibson', model: 'Les Paul' },
];


export async function getAll() {

    return await Guitar.find();
    // return Promise.resolve(guitars);
}
export async function getById(id) {
  
    return await Guitar.findById(id)
   
}
export async function getByMake(make) {

    return await Guitar.find({make_lower:make.toLowerCase()});

}
export function addGuitar(make, model) {
    const guitar = {
        id: getId(),
        make,
        model
    };
    guitars.push(guitar);
    return Promise.resolve(guitar);
}
export function saveGuitar(guitar) {

    return Promise.resolve(true);
}
export function removeGuitar(guitar) {
    const index = guitars.indexOf(guitar);
    guitars.splice(index, 1);
    return Promise.resolve(true);
}