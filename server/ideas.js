const express = require('express');
const ideasRouter = express.Router();

const db = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');


// Check if the requested idea exists
ideasRouter.use('/:ideaId', (req, res, next) => {
  const foundIdea = db.getFromDatabaseById('ideas', req.params.ideaId);
  if (!foundIdea) {
    res.status(404).send();
  } else {
    req.foundIdea = foundIdea;
    next();
  }
});

// GET all
ideasRouter.get('/', (req, res, next) => {
  const ideas = db.getAllFromDatabase('ideas');
  res.send(ideas);
});

// POST
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  if (req.body.name) {
    const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
  } else {
    res.status(400).send();
  }
});

// GET a specific minion
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.foundIdea);
});

// Update a minion
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
  if (updatedIdea) {
    res.send(updatedIdea);
  } else {
    res.status(400).send();
  }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deletedSuccessfully = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deletedSuccessfully) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
