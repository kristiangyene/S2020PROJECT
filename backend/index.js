const express           = require('express');
const lowDB             = require('lowdb');
const fileSync          = require('lowdb/adapters/FileSync');
const { v4: uuidv4 }    = require('uuid');
const bcrypt            = require('bcrypt');

/*
let pswrd = bcrypt.hashSync('12345', 9);
console.log(pswrd);
*/

const app = express();

const { PORT = 3000 } = process.env;

const adapter = new fileSync('db.json');
const db = lowDB(adapter);

// middleware
app.use(express.json());


// default state
const { users } = db.getState();
if (!users){
    db.defaults({
        users:[]
    }).write();
}


// Base endpoint
app.get('/', (req, res) => {
    return res.status(200).send("Fancy user API");    
});


// Get user
app.get('/v1/users', (req, res) => {
    const movies = db.get('users');
    return res.status(200).json({
        success: true,
        data: users
    });
});


// Get specific user with ID
app.get('/v1/movies/:id', (req, res) => {
    const { id } = req.params;
    return res.status(200).send("Getting specific user with ID:", id);    
});


// Post a new movie
app.post('/v1/movies', (req, res) => {
    const { user } = req.body;
    if(!user) return res.status( 404 ).json({
        success: false,
        error: 'No user was sent.'
    });
    const newId = uuidv4();
    db.get('users').push({
        id: newId,
        ...user
    }).write();
    return res.status(201).json({
        success: true,
        data: newId
    });    
});

app.listen(PORT, () => console.log("Server started on port ", PORT));
)