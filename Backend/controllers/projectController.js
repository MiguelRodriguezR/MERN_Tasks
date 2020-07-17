const Project  = require('../models/Project')
const { validationResult } =  require('express-validator');
const { request } = require('express');

function checkErrors(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
}

exports.createProject = async (req, res) =>{

    checkErrors(req, res);

    try {
        const project = new Project(req.body);
        project.creator = req.user.id
        project.save();   
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('internal error')
    }
}

exports.getProjects = async (req, res) =>{
    try {
        const projects = await Project.find({ creator: req.user.id }).sort({ creationDate: -1});
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('internal error')
    }
}

exports.deleteProject = async (req, res) =>{
    try {
       
        let project = await Project.findById(req.params.id);

        if(!project){
            return res.status(404).json({msg: 'project not found'})
        }

        if( project.creator.toString() !== req.user.id ){
            return res.status(401).json({msg: 'not authorized'})
        }

        await Project.findOneAndRemove({ _id: req.params.id});
        res.json({ msg: 'successfully deleted'})

    } catch (error) {
        console.log(error);
        res.status(500).send('internal error')
    }
}

exports.updateProject = async (req, res) =>{

    checkErrors(req, res);

    const {name} = req.body;
    const newProject = {};
    if(name) newProject.name = name;
     
    try {

        let project = await Project.findById(req.params.id);

        if(!project){
            return res.status(404).json({msg: 'project not found'})
        }

        if( project.creator.toString() !== req.user.id ){
            return res.status(401).json({msg: 'not authorized'})
        }

        project = await Project.findByIdAndUpdate({_id: req.params.id}, {$set : newProject}, {new: true});

        res.json({project})

        
    } catch (error) {
        console.log(error);
        res.status(500).send('internal error')
    }
}