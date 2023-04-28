const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const account = await Accounts.getAll();
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    const account = await Accounts.create({
      name: req.body.name.trim(),
      budget: req.body.budget,
    });
    res.status(201).json(account);
  }
);

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountId,
  async (req, res, next) => {
    const account = await Accounts.updateById(req.params.id, req.body);
    res.status(200).json(account);
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
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
