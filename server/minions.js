const express = require('express');
const minionsRouter = express.Router();

const db = require('./db.js');

minionsRouter.get('/', (req, res, next) => {
  const minions = db.getAllFromDatabase('minions');
  res.send(minions);
});

minionsRouter.get('/:minionId', (req, res, next) => {
  const foundMinion = db.getFromDatabaseById('minions', req.params.minionId);
  if (foundMinion) {
    res.send(foundMinion);
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
