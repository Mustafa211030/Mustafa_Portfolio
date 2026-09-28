const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
  title:           { type:String, required:true },
  category:        String,
  subcategory:     String,
  description:     String,
  longDescription: String,
  techStack:       [String],
  images:          [String],
  liveUrl:         String,
  githubUrl:       String,
  caseStudyUrl:    String,
  featured:        { type:Boolean, default:false },
  order:           { type:Number,  default:0 },
  metrics:         [{ label:String, value:String }],
  status:          { type:String, enum:['draft','published'], default:'published' },
}, { timestamps:true })
module.exports = mongoose.model('Project', projectSchema)
