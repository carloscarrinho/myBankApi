import Account from "../models/Account.js";
import { promises } from "fs";

// o caminho relativo parte da pasta module_exports 
const path = "./data/accounts.json";
const { readFile, writeFile } = promises;

export default {
  load: async (_,res) => {
    const data = await readFile(path);
    const json = await JSON.parse(data);
    res.status(200).json(json);
  },

  index: async (_, res) => {

    res.status(200).json(json);
  },

  create: async (req, res) => {
    const { agencia, conta, name, balance } = req.body;

  }
};
