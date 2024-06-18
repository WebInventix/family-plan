const express = require("express");
const { update_parent } = require('../../controllers/user_controllers');
const router = express.Router();


router.post('/update-parent',  update_parent);




module.exports = router;
