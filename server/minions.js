const express = require('express');
const minionsRouter = express.Router();

const db = require('./db.js');

minionsRouter.get('/', (req, res, next) => {
  const minions = db.getAllFromDatabase('minions');
  res.send(minions);
});

module.exports = minionsRouter;
