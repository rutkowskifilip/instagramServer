const http = require("http");
require("dotenv").config();
const mediaRouter = require("./app/media/mediaRouter");

const tagsRouter = require("./app/tags/tagsRouter");
const filtersRouter = require("./app/filters/filtersRouter");
const fileRouter = require("./app/file/fileRouter");
const usersRouter = require("./app/user/usersRouter");
const { log } = require("console");
const profileRouter = require("./app/profile/profileRouter");

http
  .createServer(async (req, res) => {
    //images
    console.log(req.url, req.method);
    if (req.url.search("/api/photos") != -1) {
      await mediaRouter(req, res);
    }

    //tags
    else if (req.url.search("/api/tags") != -1) {
      await tagsRouter(req, res);
    }
    // filters
    else if (req.url.search("/api/filters") != -1) {
      await filtersRouter(req, res);
    } else if (req.url.search("/api/getfile") != -1) {
      await fileRouter(req, res);
    } else if (req.url.search("/api/users") != -1) {
      await usersRouter(req, res);
    } else if (req.url.search("/api/profile") != -1) {
      await profileRouter(req, res);
    }
  })
  .listen(process.env.APP_PORT, () =>
    console.log(`listen on ${process.env.APP_PORT}`)
  );
