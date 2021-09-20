import express from 'express';
import forecast from './controller/forecast.js';

const app = express();
app.use(forecast);

export default app;
