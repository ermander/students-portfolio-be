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

const PORT = process.env.PORT || 8080

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
  .connect(process.env.MONGODB_URL || 'http://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(PORT, () => {
      console.log("Running on port", PORT)
    })
  )
  .catch((err) => console.log(err))
