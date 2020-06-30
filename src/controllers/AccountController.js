import Account from "../models/Account.js";

export default {
  deposit: async (req, res) => {
    const { agencia, conta, value } = req.body;
    if (value < 0)
      res.status(403).json({ error: "Negative deposit not allowed" });
    try {
      const account = await Account.findOne({ agencia, conta });
      if (!account) res.status(404).json({ error: "Account not found" });

      const newValue = account.balance + value;
      const updatedAccount = await Account.findOneAndUpdate(
        { agencia, conta },
        { balance: newValue },
        {
          new: true,
        }
      );
      res.status(200).json(updatedAccount);

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal error" });
    }
  },

  index: async (_, res) => {
    try {
      const accounts = await Account.find({});
      res.status(200).json(accounts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Houston, we have a problem" });
    }
  },

  create: async (req, res) => {
    const { agencia, conta, name, balance } = req.body;
  },
};
