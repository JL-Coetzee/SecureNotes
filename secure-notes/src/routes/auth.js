const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post(
  '/register',
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().min(6).required()
    })
  }),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = new User({
        username,
        passwordHash: await require('bcrypt').hash(password, 12)
      });
      await user.save();
      res.status(201).json({ msg: 'Registered' });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/login',
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await user.verify(password)))
        return res.status(401).json({ msg: 'Bad credentials' });

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
