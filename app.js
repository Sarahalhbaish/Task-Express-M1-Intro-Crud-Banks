const express = require("express");
const accounts = require("./accounts");

const app = express();

app.use(express.json());

const createNewAccount = (newAccount) => {
  const newId = accounts.length + 1;
  const account = Object.assign({ id: newId }, newAccount);
  return account;
};

const updateAccount = (currentAccount, newAccount) => {
  const updatedAccount = Object.assign(currentAccount, newAccount);
  return updatedAccount;
};

const deleteAccount = (deletedAccount) => {
  accounts.filter((account) => account.id != deletedAccount);
};

app.get("/accounts", (req, res) => {
  res.json(accounts);
});

app.get("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    res.status(200).json(account);
  } else {
    res.status(404).json();
  }
});

app.get("/accounts/username/:username", (req, res) => {
  const { username } = req.params;
  const { currency } = req.query;
  const account = accounts.find((account) => account.username == username);
  if (account) {
    let accountData = { ...account };
    if (currency && currency.toLowerCase() === "usd") {
      const conversionRate = 1.1; 
      accountData = {
        ...accountData,
        fundsUSD: account.funds * conversionRate,
      };
    }
    res.status(200).json(accountData);
  } else {
    res.status(404).json();
  }
});

app.put("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    const updatedAccount = updateAccount(account, req.body);
    res.status(200).json(updatedAccount);
  } else {
    res.status(404).json();
  }
});

app.delete("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    deleteAccount(accountId);
    res.status(204).end();
  } else {
    res.status(404).json();
  }
});

app.post("/accounts", (req, res) => {
  const newAccount = createNewAccount(req.body);
  res.json(201).json(newAccount);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
