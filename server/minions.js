const express = require('express');
const minionsRouter = express.Router();

const db = require('./db.js');

// Check if the requested minion exists
minionsRouter.use('/:minionId', (req, res, next) => {
  const foundMinion = db.getFromDatabaseById('minions', req.params.minionId);
  if (!foundMinion) {
    res.status(404).send();
  } else {
    req.foundMinion = foundMinion;
    next();
  }
});

// GET all
minionsRouter.get('/', (req, res, next) => {
  const minions = db.getAllFromDatabase('minions');
  res.send(minions);
});

// POST
minionsRouter.post('/', (req, res, next) => {
  if (req.body.name) {
    const newMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
  } else {
    res.status(400).send();
  }
});

// GET a specific minion
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.foundMinion);
});

// Update a minion
minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
  if (updatedMinion) {
    res.send(updatedMinion);
  } else {
    res.status(400).send();
  }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deletedSuccessfully = db.deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedSuccessfully) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
