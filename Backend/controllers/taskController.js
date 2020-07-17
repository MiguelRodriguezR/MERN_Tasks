const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");
const { request } = require("express");
const router = require("../routes/tasks");

function checkErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}

exports.createTask = async (req, res) => {
  checkErrors(req, res);

  try {
    const { project } = req.body;

    const projectProve = await Project.findById(project);
    if (!projectProve) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (projectProve.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { project } = req.body;

    const projectProve = await Project.findById(project);
    if (!projectProve) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (projectProve.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    const tasks = await Task.find({ project });
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { project, name, state } = req.body;

    const projectProve = await Project.findById(project);
    const taskProve = await Task.findById(req.params.id);

    if (!taskProve) {
      return res.status(404).json({ msg: "Task not found" });
    }
    if (projectProve.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    const newTask = {};
    if (name) newTask.name = name;
    if (state) newTask.state = state;

    const task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });

    res.json({task});

  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  }
};

exports.deleteTask = async (req, res) =>{
    try {
       
        const { project } = req.body;

        const projectProve = await Project.findById(project);
        const taskProve = await Task.findById(req.params.id);

        if (!taskProve) {
        return res.status(404).json({ msg: "Task not found" });
        }
        if (projectProve.creator.toString() !== req.user.id) {
        return res.status(401).json({ msg: "not authorized" });
        }


        await Task.findOneAndRemove({ _id: req.params.id});
        res.json({ msg: 'successfully deleted'})

    } catch (error) {
        console.log(error);
        res.status(500).send('internal error')
    }
}
