const express  = require('express');
const router = express.Router();

const  {createToll, checkValidity} = require("../controller/trip");

router.post('/create', createToll);
router.get('/:registrationNumber', checkValidity);

//router.param('userId', getUser);

module.exports = router;