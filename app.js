const express = require("express");

const app = express();

const cors = require("cors")

const transactionController = require("./controllers/transaction.Controller")

app.use(express.json());
app.use(cors());

// app.use("/", expenseController);
app.get("/", (req,res)=>{
    res.status(200).send(`Welcome to your budget app!`);
});


app.use("/transactions", transactionController);


module.exports = app;