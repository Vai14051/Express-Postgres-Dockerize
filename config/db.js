const { Pool} = require('pg');
require('dotenv').config();


console.log({
  user: process.env.DB_User,
  host: process.env.DB_Host,
  database: process.env.DB,
  password: process.env.DB_Password,
  port: process.env.DB_PORT,
});


const pool = new Pool({
    user:process.env.DB_User,
    host:process.env.DB_Host,
    database:process.env.DB,
    password:process.env.DB_Password,
    port:process.env.DB_PORT
})


module.exports = pool;

//  in case of prisma we have to use this 

// const {PrismaClient} = require("../generated/prisma");
// const prisma = new PrismaClient({
//     log:["query"]
// });


// module.exports=prisma;