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


//Create a planet --- inputs planet info then post it to your galaxy
app.get('/planets/new', (req, res) => {
    res.render('planets/new');
});
app.post('/planets/new', (req, res) => {
    res.redirect('/planets/index.ejs')
} )

// Show the planet
app.get('/planets/:id' , async (req,res) => {
    const planet = await Planet.findById(req.params.id)
    res.render('planets/show.ejs', {planet});
})
// Edit the planet (gettin the page, then putting updated information.)
app.get('/planets/:id/edit', async (req,res) => {
    const editPlanet = await Planet.findById(req.params.id);
    res.render('fruits/edit.ejs')
})
//then...
app.put('/planets/:id' , async (req,res) => {
    const planet = await Planet.findByIdAndUpdate(req.params.id , req.body)
    res.redirect(`/planets/${req.params.id}`)
})
// Delete the planet
app.delete('/planets/:id' , async (req,res) => {
    const planet = await Planet.findByIdAndDelete(req.params.id)
    console.log('signal is being sent ur just being redirected to the wrong place')
    res.redirect('/planets')
})




//Show all planets
app.get('/planets', async (req,res) => {
    const allPlanets = await Planet.find({});
    const noPlanets = allPlanets.length === 0;


    res.render("planets/index.ejs", {allPlanets, noPlanets})
});




//


app.post('/planets' , async (req,res) => {
    await Planet.create(req.body)
   
    res.redirect('/planets/show');
});










app.listen(3000, () => {
    console.log('Listening on port 3000');
});



//           A  landing page --> index.ejs -----> complete
//- Title, header, and brief description
//- Create/Add a planet link
//- View all planets link (if else statement for if visiblePlanets <= 0) 

//           A create/Add a planet page --> new.ejs  -----> complete
//- planet name, isrealplanet?, description,image,
//- will need <form> and <input> and <type>
// Put request from route /planets/new that redirects to /planets
//-Add Planet button should redirect to the signle planet index page

//           Planet index page  --> show.ejs   -----> complete
// -page showing the created planet and its details
// - browse all planets link <a href> redirects to full planetS index page

// these are added but dont quite work yet     <---------- not complete ------------>
// - ===edit planet button or link that redirects to edit planet page
// - ===delete planet button that removes planet from full planetS index page & server


//           PlanetS index page --> /planets/idex.ejs -----> complete
// - page shows details 'FOR EACH' planet created
// - link to create a planet page, link to landing page


// I should come to the landing page
//See create a planet and browse planets both clickable links

//create a planet takes me to /planet/new where i create a planet with a name, descr,checkboc - when i click to create it bugs
//browse planets takes me to /planets/index where I see every planet and details listed

//on browse planets each planet should be a clickable name that takes me to 
//their specific planet index pages based on their ID

//on their index page there should be a edit planet link and a delete planet link
// (need a app.put route for edit/update and app.delete route for delete)
//Once deleted it should redirect to show all planets page (/planets/index.ejs)