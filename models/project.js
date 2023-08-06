const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Title : {
        type :String,
        required:true
    },
    Description : {
        type :String,
        required:true
    },
    Labels: {
        type :[String],
        required:true
    },
    Author : {
        type :String,
        required:true
    },
    created :{
        type : Date,
        required:true,
        default :Date.now
    }
   
 })
 const ProjectSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name : {
        type :String,
        required:true
    },
    Description : {
        type :String,
        required:true
    },
    Author : {
        type :String,
        required:true
    },
    Issue:[IssueSchema],
    created :{
        type : Date,
        required:true,
        default :Date.now
    }
   
 })

  module.exports = mongoose.model("Project",ProjectSchema)