const express = require("express");

const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { updateBalance } = require("../services/userService");

// Проверка баланса пользователя и обновление в реальном времени
router.patch(
  "/:id/balance",
  param("id").isInt().toInt(),
  body("amount").isInt().toInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await updateBalance(req.params.id, req.body.amount);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

router.post(
  "/:id/balance",
  param("id").isInt().toInt(),
  body("amount").isInt().toInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await updateBalance(req.params.id, req.body.amount);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
