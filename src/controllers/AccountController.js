import Account from "../models/Account.js";

export default {
  index: async (_, res) => {
    try {
      const accounts = await Account.find({});
      return res.status(200).json(accounts);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Houston, we have a problem" });
    }
  },

  deposit: async (req, res) => {
    const { agencia, conta, value } = req.body;
    if (value < 0)
      return res.status(403).json({ error: "Negative deposit not allowed" });
    try {
      const account = await Account.findOne({ agencia, conta });
      if (!account) return res.status(404).json({ error: "Account not found" });

      const newValue = account.balance + value;
      const updatedAccount = await Account.findOneAndUpdate(
        { agencia, conta },
        { balance: newValue },
        {
          new: true,
        }
      );
      return res.status(200).json(updatedAccount);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal error" });
    }
  },

  withdraw: async (req, res) => {
    const { agencia, conta, value } = req.body;
    if (value <= 0)
      return res.status(403).json({ denied: "Negative value not allowed" });
    try {
      const account = await Account.findOne({ agencia, conta });
      if (!account) return res.status(404).json({ error: "Account not found" });
      if (value > account.balance)
        return res.status(403).json({ denied: "Value greater than balance" });

      const newValue = account.balance - (value + 1);
      const updatedAccount = await Account.findOneAndUpdate(
        { agencia, conta },
        { balance: newValue },
        { new: true }
      );
      return res.status(200).json(updatedAccount);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal error" });
    }
  },

  read: async (req, res) => {
    const { agencia, conta } = req.body;
    try {
      const account = await Account.findOne({ agencia, conta });
      if (!account) return res.status(404).json({ error: "Account not found" });
      const { name, balance } = account;
      return res.status(200).json({ name, balance });
    } catch (err) {
      console.log(err);
      return res.status(200).json({ error: "Internal error" });
    }
  },

  delete: async (req, res) => {
    const { agencia, conta } = req.body;
    try {
      const account = await Account.findOne({ agencia, conta });
      if (!account) return res.status(404).json({ error: "Account not found" });

      await Account.findOneAndDelete({ agencia, conta });

      const numbOfAccounts = await Account.find({ agencia }).countDocuments();
      return res.status(200).json(numbOfAccounts);
    } catch (err) {
      console.log(err);
      return res.status(200).json({ error: "Internal error" });
    }
  },

  transfer: async (req, res) => {
    const { origin, destination, value } = req.body;
    if (value <= 0)
      return res.status(403).json({ denied: "Negative value not allowed" });

    try {
      const originAccount = await Account.findOne({ conta: origin });
      if (!originAccount)
        return res.status(404).json({ error: "Origin account not found" });

      if (originAccount.balance <= value)
        return res
          .status(403)
          .json({ denied: "No money enough to this transaction" });

      const destinationAccount = await Account.findOne({ conta: destination });
      if (!destinationAccount)
        return res.status(404).json({ error: "Destination account not found" });

      if (originAccount.agencia !== destinationAccount.agencia) {
        const fee = 8;
        const newOrigValue = originAccount.balance - (value + fee);
        const newDestValue = destinationAccount.balance + value;
        const newOrigAccount = await Account.findOneAndUpdate(
          { conta: origin },
          { balance: newOrigValue },
          { new: true }
        );
        const newDestAccount = await Account.findOneAndUpdate(
          { conta: destination },
          { balance: newDestValue },
          { new: true }
        );
        return res.status(200).json({ newOrigAccount, newDestAccount });
      }

      const newOrigValue = originAccount.balance - value;
      const newDestValue = destinationAccount.balance + value;
      const newOrigAccount = await Account.findOneAndUpdate(
        { conta: origin },
        { balance: newOrigValue },
        { new: true }
      );
      await Account.findOneAndUpdate(
        { conta: destination },
        { balance: newDestValue },
        { new: true }
      );
      return res.status(200).json(newOrigAccount);

    } catch (err) {
      console.log(err);
      return res.status(200).json({ error: "Internal error" });
    }
  },

  average: async (req, res) => {
    const { agencia } = req.body;
    try {
      const accounts = await Account.find({agencia});
      if(!accounts) return res.status(404).json({error: "Agency not found"});

      const total = accounts.reduce((acc, account) => {
        return acc + account.balance; 
      }, 0);

      const formattedTotal = total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
      const average = total / accounts.length;

      return res.status(200).json({agencia, total: formattedTotal, average});

    } catch (err) {
      console.log(err);
      return res.status(500).json({error: "Internal error"});
    }
  }
};
