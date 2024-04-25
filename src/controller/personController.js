// controllers/personController.js
const Person = require('../model/personModel');
const personValidation = require('../utils/dataValidation');

module.exports = {
    getAllPersons: async (req, res) => {
        try {
            const persons = await Person.find();
            res.json(persons);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getPersonById: async (req, res) => {
        const { personId } = req.params;
        try {
            const person = await Person.findById(personId);
            if (!person) {
                return res.status(404).json({ error: 'Person not found' });
            }
            res.json(person);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    createPerson: async (req, res) => {
        const { error } = personValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { name, age, hobbies } = req.body;
        try {
            const newPerson = await Person.create({ name, age, hobbies });
            res.status(201).json(newPerson);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    updatePerson: async (req, res) => {
        const { error } = personValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { personId } = req.params;
        const { name, age, hobbies } = req.body;
        try {
            const updatedPerson = await Person.findByIdAndUpdate(personId, { name, age, hobbies }, { new: true });
            if (!updatedPerson) {
                return res.status(404).json({ error: 'Person not found' });
            }
            res.json(updatedPerson);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deletePerson: async (req, res) => {
        const { personId } = req.params;
        try {
            const deletedPerson = await Person.findByIdAndDelete(personId);
            if (!deletedPerson) {
                return res.status(404).json({ error: 'Person not found' });
            }
            res.json(deletedPerson);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
