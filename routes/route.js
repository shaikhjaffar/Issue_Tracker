const express = require('express')
const router = express.Router()
const Issue = require('../models/Issue')
const mongoose = require('mongoose')
const Project = require('../models/project')
let AllIssue = []

router.get("/Issue",(req,res)=>{

    Project.find({})
   
    .then((project)=>{

     for (let i =0 ; i < project.length ;i++){
        AllIssue.push(project[i].Issue)
     }
     console.log(AllIssue)
 
     res.render("showIssue",{
         tittle:"Issue",
         project:project,
         issue:AllIssue
     })
 
    }) 

     .catch((err)=>{
         res.json({
             message:err.message
         })
     })
   
 })

  router.post("/createIssue/:id",(req,res)=>{
      let id = req.params.id
      Project.findByIdAndUpdate(id,{
        $push: {
            Issue: {
                Title:req.body.tittle,
                Description:req.body.Description,
                Labels:req.body.Labels,
                Author:req.body.Author
          }
        }
      })

      .then((issue)=>{
        req.session.message = {
            type :'success',
            message:"Issue Created Successfully"
        } 
        res.redirect("/")
      })
      .catch(err=>{
        res.status(500).json({
            message:err.message,type:'danger'
        })
    })
  })

  router.get("/issueCreate/:id",(req,res)=>{
    let id = req.params.id
    Project.findById(id)
     .then((project)=>{
        res.render("issue",{
            tittle:"Create Issue",
            project :project
        })
     })
     .catch((err)=>{
        res.redirect("/")
     })
  })
  router.get("/projectData/:id",(req,res)=>{
    let id = req.params.id
    Project.findById(id)
     .then((project)=>{
        res.render("project",{
            tittle:"Project",
            project :project
        })
     })
     .catch((err)=>{
        res.redirect("/")
     })
  })




router.get('/addProject',(req,res) =>{
    res.render('add_Project',{ tittle : "Add Project"})
})

router.post('/addProject',(req,res)=>{
  const project = new Project({
    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    Description:req.body.Description,
    Author:req.body.Author,
  })
  project.save()
  .then((result) =>{
    req.session.message = {
        type :'success',
        message:"Project Added Successfully"
    } 
    // res.status(200).json({
    //     newStudent : result
    // })
    res.redirect('/')
})
.catch(err=>{
    res.status(500).json({
        message:err.message,type:'danger'
    })
})

})

router.get("/",(req,res)=>{
   Project.find({})
   .then((project)=>{
    res.render("index",{
        tittle:"Home Page",
        project:project
    })

   }) 
    .catch((err)=>{
        res.json({
            message:err.message
        })
    })
  
})

module.exports = router