const router = require("express").Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");
const rbac = require("../middleware/rbac");
const validate = require("../middleware/validate");
const { createOrUpdate } = require("../validators/noteRules");

router.use(auth); // JWT required for all below

router.get("/", async (req, res) => {
  const notes = await Note.find({ owner: req.user.id });
  res.json(notes);
});

router.post("/", validate(createOrUpdate), async (req, res, next) => {
  try {
    const note = await Note.create({ ...req.body, owner: req.user.id });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validate(createOrUpdate), async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  note ? res.json(note) : res.status(404).json({ msg: "Not found" });
});

/* Admins may delete any note; regular users can’t delete at all */
router.delete("/:id", rbac(["admin"]), async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
