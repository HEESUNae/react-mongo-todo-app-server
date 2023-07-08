const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    pw: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'user',
  }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
