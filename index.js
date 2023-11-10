const express = require('express')
const app = express()
const PORT = 8080

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.set('view engine', 'ejs')
app.use(express.static('static'))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get("/", async(req, res) => {
  const lists = await prisma.list.findMany({include:{todos: true}});
  const activeList = lists[0]
  res.render('index', {lists, activeList})
})

app.get("/lists", async(req, res) => {
  const lists = await prisma.list.findMany({include:{todos: true}});
  res.json(lists)
})

// NEW ROUTE FOR TO-DO?
app.post("/todo", async(req, res, next) => {
  const todo = await prisma.todo.create({
    data: {
      todo: req.body.item,
      listid: parseInt(req.body.list),
    }
  })
  res.redirect("/")
})

app.post("/lists", async (req, res, next) => {
  const list = await prisma.list.create({
    data: {
      name: req.body.name,
    }
  })
  res.json(list)
})

//DONE route *this works
app.get("/todos/:id/done", async(req, res) => {
  const todo = await prisma.todo.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: {
      done: true
    }
  })
  res.redirect("/")
})

//UNDO route *this now works
app.get("/todos/:id/undo", async(req, res) => {
  const todo = await prisma.todo.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: {
      done: false
    }
  })
  res.redirect("/")
})

//DELETE route *this doesn't either whatthefuck
app.get("/todos/:id/delete", async(req, res) => {
  const todo = await prisma.todo.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.redirect("/")
})

//NEW ROUTE TO CHANGE ACTIVE LIST?
app.get("/lists/:id", async(req, res) => {
  const lists = await prisma.list.findMany({include:{todos: true}});
  const activeList = lists.filter((list) => list.id === parseInt(req.params.id))[0]
  
  res.render('index', {lists, activeList})
})


app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT)
})