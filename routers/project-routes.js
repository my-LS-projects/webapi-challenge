const express = require("express");
const projModel = require("../data/helpers/projectModel");
const actModel = require("../data/helpers/actionModel");
const router = express.Router();
const { get, insert, update, remove, getProjectActions } = projModel;

module.exports = router;

router.get("/", (req, res) => {
  get()
    .then(projects => res.status(200).json(projects))
    .catch(() => res.status(500).json({ error: "Error retrieving projects" }));
});

router.get("/:id", validateById, (req, res) => {
  const { id } = req.params;
  get(id)
    .then(project => res.status(200).json(project))
    .catch(error =>
      res.status(500).json({ error: "Error retrieving project" })
    );
});

router.post("/", (req, res) => {
  insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(error =>
      res.status(500).json({ error: "Project could not be created" })
    );
});

router.put("/:id", validateById, (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  update(id, req.body)
    .then(project => res.status(200).json(project))
    .catch(error =>
      res.status(500).json({ message: "Project could not be updated" })
    );
});

router.delete("/:id", validateById, (req, res) => {
  const { id } = req.params;
  remove(id)
    .then(project => {
      res.status(200).json({ message: `Project with id of ${id} deleted` });
    })
    .catch(error =>
      res.status(500).json({ message: "Project could not be deleted" })
    );
});

// ACTIONS
router.get("/:id/actions", validateById, (req, res) => {
  const { id } = req.params;
  getProjectActions(id)
    .then(actions => res.status(200).json(actions))
    .catch(error =>
      res.status(500).json({ error: "Couldn't retrieve actions" })
    );
});

router.post("/:id/actions", validateById, (req, res) => {
    const { id } = req.params
  actModel.insert(req.body)
    .then(action => res.status(201).json(action))
    .catch(error => res.status(500).json({ error: "Could not add action to project" }));
});

router.put("/:id/actions", validateById, (req, res) => {
  actModel.update()
    .then()
    .catch();
});

router.delete("/:id/actions", validateById, (req, res) => {
  actModel.remove()
    .then()
    .catch();
});

// middleware
function validateById(req, res, next) {
  const { id } = req.params;
  get(id)
    .then(project => {
      project === null
        ? res
            .status(404)
            .json({ message: "No project found with specified id" })
        : next();
    })
    .catch(error =>
      res
        .status(500)
        .json({ message: "Couldn't retrieve project with specified id" })
    );
}

function validateProject( req, res, next ) {

} 

