const express = require('express')
const app = express()
const PORT = 8080

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.set('view engine', 'ejs')
app.use(express.static('static'))

app.get("/", (req, res) => {
  res.render('index')
})




app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT)
})