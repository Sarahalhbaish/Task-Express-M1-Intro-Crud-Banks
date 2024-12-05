const accounts = require("../../accounts");

const newAccount = (Account) => {
  const newId = accounts.length + 1;
  const account = Object.assign({ id: newId }, Account);
  return account;
};

const updateCurrentAccount = (currentAccount, newAccount) => {
  const updatedAccount = Object.assign(currentAccount, newAccount);
  return updatedAccount;
};

const deletedAccount = (deletedAccount) => {
  accounts.filter((account) => account.id != deletedAccount);
};

const getAllAccounts = (req, res) => {
  res.json(accounts);
};

const createNewAccount = (req, res) => {
  const Account = newAccount(req.body);
  res.json(201).json(Account);
};

const getAccountById = (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    res.status(200).json(account);
  } else {
    res.status(404).json();
  }
};

const getAccountByUsername = (req, res) => {
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
};

const updateAccount = (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    const updatedAccount = updateCurrentAccount(account, req.body);
    res.status(200).json(updatedAccount);
  } else {
    res.status(404).json();
  }
};

const deleteAccount = (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id == accountId);
  if (account) {
    deletedAccount(accountId);
    res.status(204).end();
  } else {
    res.status(404).json();
  }
};

module.exports = {
  createNewAccount,
  getAllAccounts,
  getAccountById,
  getAccountByUsername,
  updateAccount,
  deleteAccount,
};
