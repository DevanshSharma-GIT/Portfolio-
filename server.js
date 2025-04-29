const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://desharmavansh:<Devisbest@123>@cluster0.ypnar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace <db_password> with your actual password
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if the connection fails
  });

// Create a Schema for Messages
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Message = mongoose.model('Message', messageSchema);

// POST endpoint to receive contact messages
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = new Message({ name, email, message });

  try {
    await newMessage.save();
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
