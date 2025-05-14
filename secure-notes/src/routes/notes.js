const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const Note = require('../models/Note');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');

router.use(auth);          // all routes below require JWT

router.get('/', async (req, res) => {
  const notes = await Note.find({ owner: req.user.id });
  res.json(notes);
});

router.post(
  '/',
  celebrate({
    body: Joi.object({
      title: Joi.string().required(),
      body: Joi.string().allow('')
    })
  }),
  async (req, res) => {
    const note = await Note.create({ ...req.body, owner: req.user.id });
    res.status(201).json(note);
  }
);

router.put(
  '/:id',
  celebrate({
    body: Joi.object({
      title: Joi.string(),
      body: Joi.string()
    })
  }),
  async (req, res) => {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    note ? res.json(note) : res.status(404).json({ msg: 'Not found' });
  }
);

/* Admins may delete any note; regular users can’t delete at all */
router.delete('/:id', rbac(['admin']), async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;
