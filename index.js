const express = require('express')
const { v4: uuidv4 } = require('uuid');
const cors = require("cors");

const app = express()
app.use(express.json());

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []
}] //This is your in memory database


app.set('db', persons)
//TODO: Implement crud of person

app.get('/person', (req, res) => {
    res.status(200).json(app.get('db'));
});

app.get('/person/:personId', (req, res) => {
    const personId = req.params.personId;
    const person = app.get('db').find(p => p.id === personId);

    if (!person) {
        res.status(404).json({ message: 'person not found' });
    }

    res.status(200).json(person)
});

app.post('/person', (req, res) => {
    const { name, age, hobbies } = req.body;
    if (!name || !age || !hobbies) {
        return res.status(400).json({ error: "Invalid input" });
    }

    if (isNaN(Number(age))) {
        console.log("Validation failed: Age is not a valid number.");
        return res.status(400).json({ error: "Invalid input: age must be a number." });
    }

    if (!Array.isArray(hobbies)) {
        console.log("Validation failed: Hobbies is not an array.");
        return res.status(400).json({ error: "Invalid input: hobbies must be an array." });
    }

    const newPerson = {
        id: uuidv4(),
        name,
        age: Number(age),
        hobbies
    };

    app.get('db').push(newPerson);
    res.status(200).json(newPerson);
})

// update an existing person
app.put('/person/:personId', (req, res) => {
    const personId = req.params.personId;
    const { name, age, hobbies } = req.body;

    const personIndex = app.get('db').findIndex(p => p.id === personId);
    if (personIndex === -1) {
        return res.status(404).json({ error: 'Person not found' });
    }

    // Validation
    if (!name || !age || !Array.isArray(hobbies)) {
        return res.status(400).json({ error: 'Invalid input: name, age (number), and hobbies (array) are required.' });
    }

    const updatedPerson = {
        id: personId,
        name,
        age: Number(age),
        hobbies
    };

    app.get('db')[personIndex] = updatedPerson; // Update person
    res.status(200).json(updatedPerson);
});

app.delete('/person/:personId', (req, res) => {
    const personId = req.params.personId;
    const personIndex = app.get('db').findIndex(p => p.id === personId);

    if (personIndex === -1) {
        return res.status(404).json({ error: 'Person not found' });
    }

    app.get('db').splice(personIndex, 1); // Remove person
    res.status(204).send(); // No content
});

// Handle non-existing endpoints
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Handle internal server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}
module.exports = app;