const { Schema, model } = require("mongoose")
const mongooseAutoPopulate = require("mongoose-autopopulate")

const projectsSchema = new Schema (
    {
        projectName: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: false
        },
        description: {
            type: String,
            description: true
        },
        studentId: {
            type: Schema.Types.ObjectId, ref: "Students",
            required: true,
            autopopulate: { select: "_id name surname"}
        }
    }
)
projectsSchema.plugin(mongooseAutoPopulate)
const ProjectsModel = model("Projects", projectsSchema)
module.exports = model("Projects", projectsSchema)