const Loan = require("../models/Loan");

const createLoan = async (req, res) => {
  try {
    const { amount, term } = req.body;
    const repayments = Array.from({ length: term }).map((_, i) => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + (i + 1) * 7);
      return { dueDate, amount: (amount / term).toFixed(2) };
    });

    const loan = await Loan.create({
      userId: req.user.userId,
      amount,
      term,
      repayments,
    });
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const approveLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, { status: "APPROVED" }, { new: true });
    res.status(200).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createLoan, approveLoan };
