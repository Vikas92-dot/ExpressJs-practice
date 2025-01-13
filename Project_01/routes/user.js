const express = require('express');
const {handleGetAllUsers,handleAddNewUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById} = require('../controllers/user');

const router = express.Router();
router.get('/', handleGetAllUsers);


router.get("/:id", handleGetUserById);
router.post("/", handleAddNewUser);
router.patch("/:id",handleUpdateUserById);
router.delete("/:id",handleDeleteUserById);

module.exports = router;