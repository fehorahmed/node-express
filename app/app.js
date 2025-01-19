import express from "express";
import { routes as guitarRoute } from "./guitars/routes.js";
import { routes as authRoute } from "./auth/routes.js";
import session from "express-session";
import {create as createHandlebars} from 'express-handlebars'
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const hbs = createHandlebars();
dotenv.config();

await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learn-mongo.zzucy.mongodb.net/?retryWrites=true&w=majority&appName=Learn-Mongo`);

app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './app/views');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret:'this is my sectreat. loooow fata',
    saveUninitialized:false,
    resave:false
}));


app.use((req,res,next)=>{
    if(req.session.user && req.session.user.isAuthenticated){
        res.locals.user = req.session.user;
    }
    next();
})



app.use('/guitars', guitarRoute);
app.use('/',authRoute)

app.get('/', (req, res) => {
    res.render('home');
});



export function start() {
    app.listen(5000, () => {
        console.log('Listening at http://localhost:5000');
    })
}
