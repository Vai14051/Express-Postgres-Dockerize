const express = require('express');
const app = express();
const cors =  require('cors');
require('dotenv').config();
const PORT = process.env.PORT;
const prisma = require("./config/db");
// middleware
app.use(express.json());
app.use(cors("*"));
const routes =  require("./routes/routes");
const errorHandling = require('./middlewares/errorHandler');
const createUserTable =  require("./data/createUserTable");

createUserTable();

app.get('/', async (req,res)=>{
    try{

        const result = await pool.query("SELECT current_database()");
        console.log("Here is the result",result);
        res.send(`Thelt database name is ${result.rows[0].current_database}`)

    }
    catch(error)
    {

        console.log(error);
        res.status(500).json({
            message:"Database Error",
            succcess:false,
        })

    }
})


// Routes
app.use("/api",routes);

// error handling middleware
app.use(errorHandling);

// server
app.listen(PORT,(req,res)=>{
    console.log(`Successfully Working at ${PORT}`)
})