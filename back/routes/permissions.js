let express = require('express');
let router = express.Router();
let permissionsController = require('../public/controllers/permissionsController');


router.get('/get/granted', permissionsController.getPermissionsGranted);
router.get('/get/received', permissionsController.getPermissionsReceived);
router.post('/create', permissionsController.createPermissions);

router.get('/searchEmail/:content', permissionsController.searchEmail);

module.exports = router;