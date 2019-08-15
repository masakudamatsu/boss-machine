const checkMillionDollarIdea = (req, res, next) => {
  const totalValue = req.body.numWeeks * req.body.weeklyRevenue;
  if (isNaN(totalValue) || totalValue < 1000000) {
    res.status(400).send();
  } else {
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
