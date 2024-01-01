const express = require('express');
const connectDB = require('./db')

const fs = require('fs');
const Logement = require('./logement');

const app = express();
app.use(express.json());



connectDB();


app.get('/logements', async (req, res) => {
    try {
        const logements= await Logement.find();
        res.json(logements);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/logements/:id', async (req, res) => {    
    try {
        const logement = await Logement.findOne({ id: value });;
        if (!logement) throw new Error('Product not found');
        res.json(logement);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});



app.post('/logements/initialize', async (req, res) => {
    try {
        // Read logements data from JSON file
        const logementsData = JSON.parse(fs.readFileSync('init_data.json', 'utf8'));

        // Loop through each logement object
        for (const logement of logementsData) {
            // Check if the value of the attribute already exists in the collection
            const existingLogement = await Logement.findOne({ id: logement.id });

            // Insert the logement object only if the value doesn't exist
            if (!existingLogement) {
                await Logement.create(logement);
            }
        }

        res.json({ message: 'Logements collection initialized successfully.' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
const port = 5000;

app.listen(port, () => {
    console.log("API server started on port 5000");
})