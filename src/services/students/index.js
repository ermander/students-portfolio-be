const express = require("express")
const q2m = require("query-to-mongo")

const studentSchema = require("./schema.js")

const studentsRouter = express.Router()

studentsRouter.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query)
    const students = await studentSchema.find(query.criteria, query.options.fields)
    const total = await studentSchema.countDocuments()
      .skip(query.options.skip) // Skippa i primi x risultati
      .limit(query.options.limit) // Limita a x il numero di risultato
      .sort(query.options.sort) // Decide l'ordine dei risultati
    res.send({
      students: students,
      total: total,

    })
  } catch (error) {
    next(error)
  }
})

studentsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const student = await studentSchema.findById(id)
    if (student) {
      res.send(student)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next("While reading students list a problem occurred!")
  }
})

studentsRouter.post("/", async (req, res, next) => {
  try {
        const newstudent = new studentSchema(req.body)
        const { _id } = await newstudent.save()
        res.status(201).send(_id)
    }
    catch (error) {
    next(error)
  }
})

studentsRouter.put("/:id", async (req, res, next) => {
  try {
    const student = await studentSchema.findByIdAndUpdate(req.params.id, req.body)
    console.log(student)
    if (student) {
      res.send("Ok")
    } else {
      const error = new Error(`student with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

studentsRouter.delete("/:id", async (req, res, next) => {
  try {
    const student = await studentSchema.findByIdAndDelete(req.params.id)
    if (student) {
      res.send("Deleted")
    } else {
      const error = new Error(`student with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = studentsRouter
