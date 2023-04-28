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
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", async (req, res, next) => {
  // DO YOUR MAGIC
});

router.use(async (err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
