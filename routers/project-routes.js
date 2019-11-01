const express = require("express");
const projModel = require("../data/helpers/projectModel");
const router = express.Router();
const { get, insert, update, remove, getProjectActions } = projModel;

module.exports = router;

router.get("/", (req, res) => {
  get()
    .then(projects => res.status(200).json(projects))
    .catch(() => res.status(500).json({ error: "Error retrieving projects" }));
});

router.get("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body
  console.log(req.body)
  update(id, req.body)
    .then(project => res.status(200).json(project))
    .catch(error => res.status(500).json({ message: "Project could not be updated" }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  remove(id)
    .then(project => {
      res.status(200).json({ message: `Project with id of ${id} deleted` });
    })
    .catch(error =>
      res.status(500).json({ message: "Project could not be deleted" })
    );
});

// middleware

// function validateById(req, res, next) {
//   const { id } = req.params;
//   get(id)
//   .then(project => {
//     project.length < 1
//       ? res.status(404).json({ message: "No project found with specified id" })
//       : next();
//   })
//   .catch(error => res.status(500).json({ message: "poop" }))
// }
