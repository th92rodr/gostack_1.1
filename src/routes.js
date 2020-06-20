const express = require("express");
const { uuid } = require("uuidv4");

const router = express.Router();

const repositories = [];

router.get("/repositories", (request, response) => {
  console.log("GET /repositories");
  console.log("repositories: ", repositories);
  return response.status(200).json(repositories);
});

router.post("/repositories", (request, response) => {
  console.log("POST /repositories");
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repository);
  console.log("new repository: ", repository);
  return response.status(200).json(repository);
});

router.put("/repositories/:id", (request, response) => {
  console.log("PUT /repositories");
  const { id } = request.params;
  let { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex((r) => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  if (title == undefined) {
    title = repositories[repositoryIndex].title;
  }
  if (url == undefined) {
    url = repositories[repositoryIndex].url;
  }
  if (techs == undefined) {
    techs = repositories[repositoryIndex].techs;
  }

  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs,
  };
  console.log("updated repository: ", repositories[repositoryIndex]);

  return response.status(200).json(repositories[repositoryIndex]);
});

router.delete("/repositories/:id", (request, response) => {
  console.log("DELETE /repositories");
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((r) => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

router.post("/repositories/:id/like", (request, response) => {
  console.log("POST /repositories/like");
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((r) => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories[repositoryIndex].likes++;

  return response.status(200).json(repositories[repositoryIndex]);
});

module.exports = router;
