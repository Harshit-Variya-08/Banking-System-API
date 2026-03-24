import express from 'express';
const app= express();
app.use(express.json());

import userRoute from './routes/userRoutes.js';
import transactionRoute from './routes/transactionRoutes.js' 
app.use("/api/users",userRoute);
app.use("/api/transactions",transactionRoute);

app.listen(3200);