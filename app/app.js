import express from "express";
import { routes as guitarRoute } from "./guitars/routes.js";

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.use('/guitars', guitarRoute);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});



export function start() {
    app.listen(4000, () => {
        console.log('Listening at http://localhost:4000');
    })
}
