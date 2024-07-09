const express = require("express");
const router = express.Router();
const {
getProject,
getProjects,
createProject,
updateProject,
removeProject,

} = require("../controllers/projectController");

// GET all projects
router.get("/getAllProjects", getProjects);

// GET a specific project by ID
router.get("/getProject/:project_id", getProject);

// POST create a new project
router.post("/createProject", createProject);

// PUT update details of a project
router.put("/updateProject/:project_id", updateProject);

// DELETE a project by ID
router.delete("/deleteProject/:project_id", removeProject);

module.exports = router;
