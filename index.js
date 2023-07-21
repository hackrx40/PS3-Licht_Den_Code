const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./dbConnect');

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

const authRouter = require('./routes/authRoutes');
const yFinRouter = require('./routes/yFinRoutes');
const stockRouter = require('./routes/stockRoutes');

// Assigning Routes
app.use('/auth', authRouter);
app.use('/yfin', yFinRouter);
app.use('/stock', stockRouter);

let port = process.env.PORT;
if (port == null || port == '') {
    port = 5000;
}

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});