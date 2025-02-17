const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose'); 
const Planet= require('./models/planets');

// const methodOverride =  require('method-override');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})


const { name } = require('ejs');
app.set("view engine", "ejs"); 


//middleware

app.use(express.urlencoded({extended: false}));


//Landinf page
app.get('/' , async (req, res) => {
    res.render('index.ejs');
});


//Create a planet
app.get('/planets/new', (req, res) => {
    res.render('planets/new.ejs');
});

// Show the planet
app.get('/planets/show' , (req,res) => {
    res.render('planets/show.ejs')
})


//Show all planets
app.get('/planets/index', async (req,res) => {
    allPlanets = await Planet.find();

    if ( Planet.length === 0) {
        return res.render("planets/index.ejs", { planets: [], noPlanets: true})
    } else { res.render('index', {Planet, noPlanets:false})};
    //if statemnet saying if there are no planets, show "There are no planets added"
    res.render('planets/index.ejs')
});







app.post('/planets' , async (req,res) => {
    if (req.body.isAPlanet === 'on') {
        req.body.isAPlanet = true;
    } else {
        req.body.isAPlanet = false;
    }
    await Planet.create(req.body)
    res.render('planets/index.ejs');
});

// 

// searchedPlanet = await Planet.findById();









app.listen(3000, () => {
    console.log('Listening on port 3000');
});



//           A  landing page --> index.ejs
//- Title, header, and brief description
//- Create/Add a planet link
//- View all planets link (if else statement for if visiblePlanets <= 0)

//           A create/Add a planet page --> new.ejs
//- planet name, isrealplanet?, description,image,
//- will need <form> and <input> and <type>
// Put request from route /planets/new that redirects to /planets
//-Add Planet button should redirect to the signle planet index page

//           Planet index page  --> show.ejs
// -page showing the created planet and its details
// - browse all planets link <a href> redirects to full planetS index page
// - edit planet button or link that redirects to edit planet page
// - delete planet button that removes planet from full planetS index page & server

//           PlanetS index page --> /planets/idex.ejs
// - page shows details 'FOR EACH' planet created
// - link to create a planet page, link to landing page

