const express = require('express');
const cors = require('cors');
require('dotenv').config();

const itemsRouter = require('./routes/items');
const authRouter = require('./routes/auth');
const claimsRouter = require('./routes/claims');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/items', itemsRouter);
app.use('/api/auth', authRouter);
app.use('/api/claims', claimsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});