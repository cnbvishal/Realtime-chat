import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import {errorHandler,notFound} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
dotenv.config();

connectDB();
const app= express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Api is running...')
});
app.use('/api/users',userRoutes);

app.use(notFound)
app.use(errorHandler);


const PORT= process.env.PORT || 8000 ;

app.listen(PORT,console.log(`Server is running in test mode on port 8000`))