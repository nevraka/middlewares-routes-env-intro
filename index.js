// setup for express
const express = require("express");
const app = express();

require('dotenv').config()



const port = 3000;

// require some data form your data.js file
let {students, instructors, getStudents, getTeachers} = require('./data')

// just a simple middleware to show you how it works
// you will always see that console.log when you visit any page
app.use((req, res, next) => {
    console.log("Hello im the middleware");
    next();
});

// letting your middleware know where to find all static files
app.use(express.static(__dirname + "/public"));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views' )


const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')


// ROUTES DEFINED BELOW

app.get("/", (req, res) => {
    let myName = 'Manish'
    console.log (  process.env.PASSWORD  )
    res.render('landing.hbs', {name: myName, age: 19})
});

const studentRoutes=require('./routes/Student.routes')
app.use('/',studentRoutes)

const instructorsRoutes=require('./routes/Instructors.routes')
app.use('/',instructorsRoutes)


//404 middleware
app.use((req, res, next) => {
    res.status(404).send('Page not found dude!')
})

//Error handling middleware->has 4 arguments
app.use((err,req,res,next)=>{
    res.send(500).send(err)
})


// Express setup to listen for all client requests on a certain port
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
