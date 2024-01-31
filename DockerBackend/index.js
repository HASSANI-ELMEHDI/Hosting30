const express = require('express');
const connectDB = require('./db')

const fs = require('fs');
const Logement = require('./logement');



const app = express();
app.use(express.json());



connectDB();


app.post('/logement', async (req, res) => {
  try {
    const logementData = req.body;
    const logement = await Logement.create(logementData);
    res.json(logement);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


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

/// Reservation endpoints -------------------------------------------------------
const Reservation = require('./reservation');
// Create a new reservation
app.post('/reservations', async (req, res) => {
    try {
      const reservationData = req.body;
      const reservation = await Reservation.create(reservationData);
      res.json(reservation);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Get all reservations
  app.get('/reservations', async (req, res) => {
    try {
      const reservations = await Reservation.find();
      res.json(reservations);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Get a specific reservation by ID
  app.get('/reservations/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) throw new Error('Reservation not found');
      res.json(reservation);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Update a reservation by ID
  app.put('/reservations/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!reservation) throw new Error('Reservation not found');
      res.json(reservation);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Delete a reservation by ID
  app.delete('/reservations/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!reservation) throw new Error('Reservation not found');
      res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });





const port = 5000;

app.listen(port, () => {
    console.log("API server started on port 5000");
})