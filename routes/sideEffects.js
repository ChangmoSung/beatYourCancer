const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const SideEffects = require("../models/SideEffects");

// @route GET /sideEffects/getSideEffectsListByAdmin
// @desc Get side effects list by admin
// @access Private
router.get("/getSideEffectsListByAdmin", auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const sideEffects = await SideEffects.find();
    if (!sideEffects.length) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No side effects by admin" }] });
    }
    res.send(sideEffects);
  } catch ({ message = "" }) {
    console.error(message);
    res.status(500).send(`Server error - ${message}`);
  }
});

// @route PUT /sideEffects/addSideEffectByAdmin
// @desc Add side effect by admin
// @access Private
router.put(
  "/addSideEffectByAdmin",
  [
    auth,
    check("sideEffectByAdmin", "Provide a commonly experienced side effect")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sideEffectByAdmin } = req.body;

    try {
      let sideEffect = await SideEffects.findOne({ sideEffectByAdmin });
      if (sideEffect) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Side effect already exists" }] });
      }

      sideEffect = new SideEffects({
        sideEffectByAdmin,
        active: true,
      });

      await sideEffect.save();

      const sideEffects = await SideEffects.find();
      res.send(sideEffects);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send(`Server error - ${message}`);
    }
  }
);

router.delete(
  "/deleteSideEffectByAdmin/:sideEffectId",
  auth,
  async (req, res) => {
    try {
      const sideEffectToDelete = await SideEffects.findOneAndRemove({
        _id: req.params.sideEffectId,
      });
      if (!sideEffectToDelete) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Side effect doesn't exist" }] });
      }

      const sideEffects = await SideEffects.find();
      res.json(sideEffects);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
