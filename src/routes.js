const express = require("express");

const Controller = require("./controller");
const { validateRepositoryId } = require("./middleware");

const router = express.Router();

router.get("/repositories", Controller.index);

router.post("/repositories", Controller.store);

router.put("/repositories/:id", validateRepositoryId, Controller.update);

router.delete("/repositories/:id", validateRepositoryId, Controller.destroy);

router.post("/repositories/:id/like", validateRepositoryId, Controller.like);

module.exports = router;
