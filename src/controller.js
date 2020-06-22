const { uuid } = require("uuidv4");

const repositories = [];

const index = (request, response) => {
  console.log("repositories: ", repositories);
  return response.status(200).json(repositories);
};

const store = (request, response) => {
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
};

const update = (request, response) => {
  let { title, url, techs } = request.body;
  const { repositoryIndex } = request;

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
};

const destroy = (request, response) => {
  const { repositoryIndex } = request;
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
};

const like = (request, response) => {
  const { repositoryIndex } = request;
  repositories[repositoryIndex].likes++;
  return response.status(200).json(repositories[repositoryIndex]);
};

module.exports = {
  index,
  store,
  update,
  destroy,
  like,
  repositories,
};
