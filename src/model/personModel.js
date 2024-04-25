// models/person.js
const mongoose = require('mongoose');
const joi = require('joi');

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    hobbies: [{ type: String }]
});

module.exports = mongoose.model('Person', personSchema);

