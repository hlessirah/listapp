const express = require('express')
const app = express()
const PORT = 8080

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.set('view engine', 'ejs')
app.use(express.static('static'))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get("/", (req, res) => {
  res.render('index')
})

app.post("/lists", async (req, res, next) => {
  const list = await prisma.list.create({
    data: {
      name: req.body.name,
    }
  })
  res.json(list)
})




app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT)
})