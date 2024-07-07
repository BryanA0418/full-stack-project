const express = require("express");
const router = express.Router();
const transactionData = require("../models/transaction.Models");
const { nanoid } = require("nanoid")



//GET ALL SPENDING

router.get("/", (req,res)=>{
    res.status(200).send(transactionData);
});

// GET A SINGLE TRANSACTION
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const transaction = transactionData.find(ele => ele.id === id || +id)
    if (transaction) {
      res.status(200).send(transaction)
    } else {
      res.status(404).json({error: `Expense with id: ${id} not found!`})
    }
  })
  //ADD A NEW TRANSACTION
  router.post("/", (req, res) => {
    const currentTransaction = {id: nanoid(5), ...req.body}
    transactionData.push(currentTransaction)
  
    res.status(201).send(currentTransaction) ||
    res.status(201).send(transactionData[transactionData.length - 1])
  })

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const transactionToDeleteIndex = transactionData.findIndex(transaction => transaction.id === id)
  
    if (transactionToDeleteIndex !== -1) {
      transactionData.splice(transactionToDeleteIndex, 1)
      res.redirect("/transactions")
    } else {
      res.status(404).send({error: `Transaction with id: ${id} not found!`})
    }
  })

  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const transactionToUpdateIndex = transactionData.findIndex(workout => workout.id === id)
  
    if (transactionToUpdateIndex !== -1) {
      transactionData[transactionToUpdateIndex] = {...transactionData[transactionToUpdateIndex], ...req.body}
      res.status(200).json(transactionData[transactionToUpdateIndex])
    } else {
      res.status(404).send({error: `Transaction with id: ${id} not found!`})
    }
  })

module.exports = router;