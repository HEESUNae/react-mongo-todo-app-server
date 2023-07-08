const { default: mongoose } = require('mongoose');

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'list',
  }
);

const List = mongoose.model('List', listSchema);

module.exports = List;
