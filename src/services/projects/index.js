const express = require("express")
const projectsSchema = require("./schema.js")

const projectsRouter = express.Router()

projectsRouter.get("/", async (req, res, next) => {
  try {
    const projects = await projectsSchema.find()
    res.send(projects)
  } catch (error) {
    next(error)
  }
})

projectsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const projects = await projectsSchema.findById(id)
    if (projects) {
      res.send(projects)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next("While reading projects list a problem occurred!")
  }
})

projectsRouter.post("/", async (req, res, next) => {
  try {
        const newProject = new projectsSchema(req.body)
        const { _id } = await newProject.save()
        res.status(201).send(_id)
    }
    catch (error) {
    next(error)
  }
})

projectsRouter.put("/:id", async (req, res, next) => {
  try {
    const project = await projectsSchema.findByIdAndUpdate(req.params.id, req.body)
    console.log(project)
    if (project) {
      res.send("Ok")
    } else {
      const error = new Error(`project with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

projectsRouter.delete("/:id", async (req, res, next) => {
  try {
    const project = await projectsSchema.findByIdAndDelete(req.params.id)
    if (project) {
      res.send("Deleted")
    } else {
      const error = new Error(`project with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = projectsRouter