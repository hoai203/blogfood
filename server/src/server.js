import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './routes';
import connectDB from './connect/connectDB';
import socketManager from './socket.io/socketManager';
const cookieParser = require('cookie-parser');
const http = require('http');

require('dotenv').config();

const app = express();

const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    exposedHeaders: ['new-token', 'new-token-admin']
};

app.use(cors(corsOptions));
app.use(cookieParser());
connectDB.connect();

app.use(express.json()); // Express framework cung cấp việc parse JSON
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

const port = process.env.PORT || 8989;

const server = http.createServer(app);

socketManager(server);

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
