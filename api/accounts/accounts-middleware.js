const db = require("../../data/db-config");
const Accounts = require("./accounts-model");

const checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  const error = { status: 400 };
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    error.message = "name and budget are required";
  } else if (typeof name !== "string") {
    error.message = "name of account must be a string";
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = "name of account must be between 3 and 100";
  } else if (typeof budget !== "number" || isNaN(budget)) {
    error.message = "budget of account must be a number";
  } else if (budget < 0 || budget > 1000000) {
    error.message = "budget of account is too large or too small";
  }
  if (error.message) {
    next(error);
  } else {
    next();
  }
  // const account = await db()
  // const name = req.body.name.trim()

  // if(!req.body.name || !req.body.budget) {
  //   res.satus(400).json({
  //     message: "name and budget are required"
  //   })
  // } else {
  //   if(!name.lenght() < 3 && !name.lenght() > 100){
  //     res.status(400).json({ message: "name of account must be between 3 and 100" })
  //   } else {
  //     next()
  //   }
  //   if(){
  //     res.status(400).json({ message: "budget of account must be a number" })
  //   } else {
  //     next()
  //   }
  //   if(!name.lenght() < 3 && !name.lenght() > 100){
  //     res.status(400).json({ message: "budget of account is too large or too small" })
  //   } else {

  //     // next()
  //   }
  // }
};

const checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db("accounts")
      .where("name", req.body.name.trim())
      .first();
    if (existing) {
      next({ status: 400, message: "that name is taken" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    if (!account) {
      next({ status: 404, message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
};
