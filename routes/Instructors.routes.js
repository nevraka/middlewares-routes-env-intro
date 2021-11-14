const router = require('express').Router();

const { getTeachers } = require('../data');

router.get('/instructors', (req, res) => {
  // Consuming a promise here
  getTeachers()
    .then((teachers) => {
      res.render('instructors.hbs', { instructors: teachers, layout: false });
    })
    .catch(() => {
      next(); //runs the next available middleware
      next('Instructors failed to fetch'); //looks for the error handling
    });
});
