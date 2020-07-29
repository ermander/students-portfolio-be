const express = require("express")
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")

const studentsRouter = require("./services/students/index")
const projectsRouter = require("./services/projects/index")

const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandler")

const server = express()

const port = process.env.PORT

const staticFolderPath = join(__dirname, "../public")
server.use(express.static(staticFolderPath))
server.use(express.json())

server.use(cors())

server.use("/students", studentsRouter)
server.use("/projects", projectsRouter)

// ERROR HANDLERS MIDDLEWARES

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

mongoose
  .connect("mongodb+srv://ermander:ermanderDB@cluster0.lkaow.azure.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port)
    })
  )
  .catch((err) => console.log(err))
