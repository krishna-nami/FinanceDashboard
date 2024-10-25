import express from "express";
import Transcation from "../models/Transaction.js";

const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transcation.find()
      .limit(50)
      .sort({ createdOn: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
export default router;
