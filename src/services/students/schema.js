const { Schema, model } = require("mongoose")
const v = require("validator")

const studentSchema = new Schema(
  {
      name: {
          type: String,
          required: true,
      },
      surname: {
          type: String,
          required: true,
      },
      dateOfBirth: {
          type: String,
          required: true,
      },
      country: {
          type: String,
          required: true,
      },    
      email: {
          type: String,
          required: true,
          lowercase: true,
          validate: {
            validator: async (value) => {
              if (!v.isEmail(value)) {
                throw new Error("Email is invalid")
              } else {
                const checkEmail = await StudentsModel.findOne({ email: value })
                if (checkEmail) {
                  throw new Error("Email already existant!")
                }
              }
            },
           }
          },
       image: {
         type: String,
         required: false
       },
       projects: [
         {
           type: Schema.Types.ObjectId, ref: "Projects"
         }
       ]
},
{ timestamps: true }
)
const StudentsModel = model("Students", studentSchema)
module.exports = model("Students", studentSchema)