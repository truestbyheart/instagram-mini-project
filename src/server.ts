import mongoose from 'mongoose';
import { PORT, MONGO_URL } from './Config/app.config';
import http from 'http';
import app from './app';

const server = http.createServer(app);

mongoose
  .connect(MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info('mongoDB is running');
    server.listen(PORT || 3000, () => console.info('App running on port: ' + PORT || 3000));
  })
  .catch((error) => new Error(error));
