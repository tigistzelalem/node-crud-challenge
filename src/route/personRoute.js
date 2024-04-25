const express = require('express');
const router = express.Router()
const personController = require('../controller/personController');

router.get('/person', personController.getAllPersons);
router.post('/person', personController.createPerson);
router.get('/person/:personId', personController.getPersonById);
router.put('/person/:personId', personController.updatePerson);
router.delete('/person/:personId', personController.deletePerson);

module.exports = router