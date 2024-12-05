const express = require("express");
const {
  createNewAccount,
  getAllAccounts,
  getAccountById,
  getAccountByUsername,
  updateAccount,
  deleteAccount,
} = require("./controllers");

const router = express.Router();

router.get("/", getAllAccounts);

router.post("/", createNewAccount);

router.get("/:accountId", getAccountById);

router.get("/username/:username", getAccountByUsername);

router.put("/:accountId", updateAccount);

router.delete("/:accountId", deleteAccount);

module.exports = router;
