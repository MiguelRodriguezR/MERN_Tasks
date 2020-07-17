const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

router.post(
  "/",
  [check("name", "Name is required").not().isEmpty()],
  auth,
  taskController.createTask
);
router.get("/", auth, taskController.getTasks);
router.put(
  "/:id",
  [check("name", "Name is required").not().isEmpty()],
  auth,
  taskController.updateTask
);
router.delete("/:id",auth,taskController.deleteTask);

module.exports = router;
