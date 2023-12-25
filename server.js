import express from 'express';
const app= express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Api is running...')
});


const PORT= process.env.PORT || 8000 ;

app.listen(PORT,console.log(`Server is running in test mode on port 8000`))