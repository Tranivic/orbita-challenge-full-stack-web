import express from 'express';
import routes from './src/routes/routes.js';
import { connect } from './src/prisma.js';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(port, async () => {
    try {
        await connect();
        console.log("Server running on port: " + port);
    } catch (error) {
        console.error('Error on server start:', error);
    }
});