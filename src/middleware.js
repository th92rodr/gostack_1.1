const { isUuid } = require('uuidv4');

const { repositories } = require('./controller');

const logRequests = (request, response, next) => {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.log(logLabel);
  return next();
};

const validateRepositoryId = (request, response, next) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid repository ID.' });
  }

  const repositoryIndex = repositories.findIndex(r => r.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  request.repositoryIndex = repositoryIndex;
  return next();
};

module.exports = {
  logRequests,
  validateRepositoryId,
};
