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
};
