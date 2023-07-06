const express = require('express');
const listController = require('../controllers/list.controller');
const listRouter = express.Router();

listRouter.post('/', listController.createList);
listRouter.get('/', listController.getList);
listRouter.get('/:listId', listController.getListById);
listRouter.delete('/:listId', listController.deleteList);
listRouter.put('/:listId', listController.updateList);

module.exports = listRouter;
