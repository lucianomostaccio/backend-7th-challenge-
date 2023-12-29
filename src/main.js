// server
import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'

import { MONGODB_CNX_STR, PORT } from './config.js'
import { apiRouter } from './routes/api/apirest.router.js'
import { webRouter } from './routes/web/web.router.js'
import { sesiones } from './middlewares/sesiones.js'
import cookieParser from "cookie-parser";
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// initialize server
await mongoose.connect(MONGODB_CNX_STR);
console.log(`conectado a base de datos en: "${MONGODB_CNX_STR}"`);

export const app = express();

app.listen(PORT, () => {
  console.log(`Server listening in port: ${PORT}`);
});

// handlebars engine & templates:
app.engine("handlebars", engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static"))); //specify static folder
app.use(sesiones);

// routers
app.use("/", webRouter);
app.use("/api/", apiRouter);
app.use(cookieParser());
