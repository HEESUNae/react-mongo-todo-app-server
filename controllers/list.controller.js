const listModal = require('../models/list.model');

//* CREATE
const createList = async (req, res, next) => {
  try {
    // const listCont = { title: req.body.title, content: req.body.content, name: req.session.user.name };
    // const listCont = { title: req.body.title, content: req.body.content };
    const createList = await listModal.create(req.body);
    res.status(201).json(createList);
  } catch (err) {
    next(err);
  }
};

//* READ

const getList = async (req, res, next) => {
  try {
    const getList = await listModal.find({});
    res.status(200).json(getList);
  } catch (e) {
    next(e);
  }
};

const getListById = async (req, res, next) => {
  try {
    const getList = await listModal.findById(req.params.listId);
    if (getList) {
      res.status(200).json(getList);
    } else {
      res.status(404).send();
    }
  } catch (e) {
    next(e);
  }
};

//* UPDATE
async function updateList(req, res, next) {
  try {
    let updateList = await listModal.findByIdAndUpdate(req.params.listId, req.body, { new: true });
    if (updateList) {
      res.status(200).json(updateList);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    next(error);
  }
}

//* DELETE
const deleteList = async (req, res, next) => {
  try {
    let deleteList = await listModal.findByIdAndDelete(req.params.listId);
    if (deleteList) {
      res.status(200).json(deleteList);
    } else {
      res.status(400).send();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createList,
  getList,
  deleteList,
  updateList,
  getListById,
};
