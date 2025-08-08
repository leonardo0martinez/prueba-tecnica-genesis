import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import {} form 


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));



app.listen(5000, () => {
    console.log("Server corriendo 🏃🏿", 5000)
});