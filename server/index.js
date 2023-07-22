const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const cors = require('cors');
const Connection = require('./Config/db.js');
const GalleryRouter = require('./Route/Gallery.Route.js');
const UserRouter = require('./Route/User.Route.js');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
app.use('/', GalleryRouter);
app.use('/',UserRouter);
Connection();
app.listen(process.env.PORT, () =>
  console.log(`Server is running successfully on PORT ${process.env.PORT}`)
);
