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
// Check if the requested work exists
minionsRouter.use('/:minionId/work/:workId', (req, res, next) => {
  const foundWork = db.getFromDatabaseById('work', req.params.workId);
  if (!foundWork) {
    res.status(404).send();
  } else {
    req.foundWork = foundWork;
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

// Work
minionsRouter.get('/:minionId/work', (req, res, next) => {
  const workDatabase = db.findDataArrayByName('work');
  if (workDatabase === null) {
      return null;
    }
  const work = workDatabase.data.filter((element) => {
    return element.minionId === req.params.minionId;
    });
  res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
  if (req.body.title) {
    const newWork = db.addToDatabase('work', req.body);
    res.status(201).send(newWork);
  } else {
    res.status(400).send();
  }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  }
  const updatedWork = db.updateInstanceInDatabase('work', req.body);
  if (updatedWork) {
    res.send(updatedWork);
  } else {
    res.status(400).send();
  }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const deletedSuccessfully = db.deleteFromDatabasebyId('work', req.params.workId);
  if (deletedSuccessfully) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
