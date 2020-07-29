const express = require("express")
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const studentsRouter = require("./services/students/index")
const projectsRouter = require("./services/projects/index")

const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandler")

const server = express()

dotenv.config();

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



const url =
  "mongodb+srv://ermander:ermanderDB@cluster0.lkaow.azure.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose
  .connect(url || "http://localhost:27017/students", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log(`working on port ${port}`);
    })
  );
mongoose.connection.on("connected", () => {
  console.log("connected to atlas");
});
