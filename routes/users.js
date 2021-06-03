const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Users = require("../models/Users");

// @route POST /users
// @desc Sign up user
// @access Public
router.post(
  "/",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 3 or more characters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await Users.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new Users({
        firstName,
        lastName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch ({ message = "" }) {
      console.error(`Server error - ${message}`);
      res.status(500).send(message);
    }
  }
);

router.delete("/", auth, async (req, res) => {
  try {
    const userToDelete = await Users.findOneAndRemove({ _id: req.user.id });
    if (!userToDelete) {
      return res.status(400).json({ errors: [{ msg: "User doesn't exist" }] });
    }
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET /users/getFoodsList
// @desc Get foods list
// @access Private
router.get("/getFoodsList", auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await Users.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "No matching user" }] });
    }
    res.send(user.foodsList);
  } catch ({ message = "" }) {
    console.error(message);
    res.status(500).send(`Server error - ${message}`);
  }
});

// @route PUT /users/addFood
// @desc Add food
// @access Private
router.put(
  "/addFood",
  [auth, check("foodName", "Provide the name of the food").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { _id, foodName } = req.body;

    try {
      const user = await Users.findOne({ _id: req.user.id });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "No matching user" }] });
      }

      const foodAlreadyOnTheList = user.foodsList.some(
        ({ foodName: foodOnTheList }) => foodOnTheList === foodName
      );
      if (foodAlreadyOnTheList) {
        return res.status(400).json({
          errors: [{ msg: "You already have this food on your list" }],
        });
      }

      user.foodsList.push({
        _id,
        foodName,
      });

      await user.save();
      res.send(user.foodsList);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send(`Server error - ${message}`);
    }
  }
);

// @route DELETE /users/deleteFood/:foodId
// @desc Delete food
// @access Private
router.delete("/deleteFood/:foodId", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

  try {
    const user = await Users.findOne({ _id: req.user.id });
    if (!user) res.status(400).json({ errors: [{ msg: "No matching user" }] });

    const foodId = req.params.foodId;
    const foodAlreadyOnTheList = user.foodsList.some(
      ({ _id }) => _id === foodId
    );
    if (!foodAlreadyOnTheList) {
      return res.status(400).json({
        errors: [{ msg: "You don't have this food on your list" }],
      });
    }

    const removeIndex = user.foodsList.map(({ _id }) => _id).indexOf(foodId);
    user.foodsList.splice(removeIndex, 1);

    await user.save();
    res.send(user.foodsList);
  } catch ({ message = "" }) {
    console.error(message);
    res.status(500).send(`Server error - ${message}`);
  }
});

// @route GET /users/getSideEffectsList
// @desc Get side effects list
// @access Private
router.get("/getSideEffectsList", auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await Users.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "No matching user" }] });
    }
    res.send(user.sideEffectsList);
  } catch ({ message = "" }) {
    console.error(message);
    res.status(500).send(`Server error - ${message}`);
  }
});

// @route PUT /users/addSideEffectByUser
// @desc Add side effect
// @access Private
router.put(
  "/addSideEffectByUser",
  [
    auth,
    check("sideEffect", "Provide the side effect you're experiencing")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { _id, sideEffect } = req.body;

    try {
      const user = await Users.findOne({ _id: req.user.id });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "No matching user" }] });
      }

      const sideEffectAlreadyOnTheList = user.sideEffectsList.some(
        ({ sideEffect: sideEffectOnTheList }) =>
          sideEffectOnTheList === sideEffect
      );
      if (sideEffectAlreadyOnTheList) {
        return res.status(400).json({
          errors: [{ msg: "You already have this side effect on your list" }],
        });
      }

      user.sideEffectsList.push({
        _id,
        sideEffect,
      });

      await user.save();
      res.send(user.sideEffectsList);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send(`Server error - ${message}`);
    }
  }
);

// @route DELETE /users/deleteSideEffectByUser/:sideEffectId
// @desc Delete side effect
// @access Private
router.delete(
  "/deleteSideEffectByUser/:sideEffectId",
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    try {
      const user = await Users.findOne({ _id: req.user.id });
      if (!user)
        res.status(400).json({ errors: [{ msg: "No matching user" }] });

      const sideEffectId = req.params.sideEffectId;
      const sideEffectAlreadyOnTheList = user.sideEffectsList.some(
        ({ _id }) => _id === sideEffectId
      );
      if (!sideEffectAlreadyOnTheList) {
        return res.status(400).json({
          errors: [{ msg: "You don't have this side effect on your list" }],
        });
      }

      const removeIndex = user.sideEffectsList
        .map(({ _id }) => _id)
        .indexOf(sideEffectId);
      user.sideEffectsList.splice(removeIndex, 1);

      await user.save();
      res.send(user.sideEffectsList);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send(`Server error - ${message}`);
    }
  }
);

module.exports = router;
