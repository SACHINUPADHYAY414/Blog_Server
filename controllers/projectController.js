const ProjectModel = require('../model/project');

const getProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.getAllprojects();
    res.json(projects);
  } catch (err) {
    console.error('Error retrieving projects', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getProject = async (req, res) => {
  const project_id = req.params.project_id;
  console.log("Received project_id:", project_id);
  try {
    const project = await ProjectModel.getprojectById(project_id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error('Error retrieving project', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const createProject = async (req, res) => {
  const { title, description, image, tech, demo_link, price } = req.body;
  const created_at = new Date();
  const newProject = { title, description, image, tech, demo_link, price, created_at };

  try {
    const project = await ProjectModel.createproject(newProject);
    res.status(201).json(project);
  } catch (err) {
    console.error('Error creating project', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProject = async (req, res) => {
  const project_id = req.params.project_id;
  const { title, description, image, tech, demo_link, price } = req.body;
  try {
    const updatedProject = await ProjectModel.updateproject(project_id, { title, description, image, tech, demo_link, price });
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (err) {
    console.error('Error updating project', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const removeProject = async (req, res) => {
  const project_id = req.params.project_id;
  try {
    const rowCount = await ProjectModel.deleteproject(project_id);
    if (rowCount === 1) {
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    console.error('Error deleting project', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  removeProject,
};
