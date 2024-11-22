const express = require("express");
const { createLoan, approveLoan } = require("../controllers/loanController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, createLoan);
router.patch("/:id/approve", auth, approveLoan);

module.exports = router;
