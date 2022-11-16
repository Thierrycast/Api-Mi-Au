const express = require("express");
const route = express();

const login = require("./controllers/login");
const authorization = require("./middleware/authorization");
const { registerUser, detailUser, updateUser } = require("./controllers/users");
const { registerPet } = require("./controllers/pets");


route.post("/users", registerUser);

route.post("/login", login);

route.use(authorization);

route.get("/users", detailUser);
route.put("/users", updateUser);

route.post("pets", registerPet)

module.exports = route;
