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

// GET a specific minion
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.foundMinion);
});

  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
