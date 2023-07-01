import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectMongoDB } from './config/db.js';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';
import visitRoutes from './routes/visitRoutes.js';
import roadRoutes from './routes/roadRoutes.js';
import wardRoutes from './routes/wardRoutes.js';


dotenv.config();
connectMongoDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

const currentModuleUrl = new URL(import.meta.url);
const currentModulePath = dirname(fileURLToPath(currentModuleUrl));

const staticDirPath = join(currentModulePath, '.', 'static');
app.use(express.static(staticDirPath));

const publicDirPath = join(currentModulePath, '.', 'public');

app.get('/', function (req, res) {
    res.sendFile(join(publicDirPath, 'index.html'));
});

// register and login user
app.use('/api/users', userRoutes)

// visits
app.use('/api/visits', visitRoutes)

//road routes
app.use('/api/roads', roadRoutes)

// wards routes
app.use('/api/wards', wardRoutes)

//create line

app.listen(port, () => {
    console.log(`Server started at http://localhost:${ port }`.magenta.underline);
});
