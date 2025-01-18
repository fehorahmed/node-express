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


export function getAll() {
    return Promise.resolve(guitars);
}
export function getById(id) {
    const guitar = guitars.find(g => g.id === id);
    return Promise.resolve(guitar);
}
export function getByMake(id) {
    const found = guitars.filter(g => g.make.toLowerCase() === id.toLowerCase());
    return Promise.resolve(found);
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