const db = require("../../data/db-config");

const checkAccountPayload = async (req, res, next) => {

  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const account = await db()

};


- `checkAccountPayload` returns a status 400 with if `req.body` is invalid:

    - If either name or budget are undefined, return `{ message: "name and budget are required" }`
    - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
    - If budget is not able to be converted into a number, return `{ message: "budget of account must be a number" }`
    - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }`

const checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
};

const checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
};

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
};
