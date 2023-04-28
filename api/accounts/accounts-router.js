const router = require("express").Router();
const Accounts = require("./accounts-model");

router.get("/", async (req, res, next) => {
  try {
    const account = await Accounts.getAll();
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const account = await Accounts.create(req.body);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const account = await Accounts.updateById(req.params.id, req.body);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const account = await Accounts.deleteById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.use(async (err, req, res, next) => {
  //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
