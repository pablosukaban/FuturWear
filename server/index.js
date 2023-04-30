import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import dalleRouter from './src/routes/dalle.routes.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use('/api/v1/dalle', dalleRouter);

app.get('/', (req, res) => {
    res.status(200).json({ message: process.env.OPEN_AI_KEY });
});

app.listen(8080, () => console.log('Server is running on port 8080'));
