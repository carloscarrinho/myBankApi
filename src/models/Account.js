import mongoose from '../database/connection.js';

const AccountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    require: true
  },
  conta: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
},
  balance: {
    type: Number,
    require: true,
    validate(balance) {
      if (balance < 0) throw new Error("O saldo não pode ser negativo.");
    }
  },
});

const Account = mongoose.model('Account', AccountSchema); 
export default Account;