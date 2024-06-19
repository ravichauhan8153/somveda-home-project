import "app-module-path/register";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import db from "./db";
import logger from "morgan";
import { failAction } from "./utilities/response";
require("dotenv").config({ path: ".env" });
import http from "http";

/**Start import routes */
import routes from "./api";
// import eventEmitter from "./utilities/events";
/**End import routes */

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";
const port = process.env.PORT ? process.env.PORT : 8000;
// const socketPort = process.env.SOCKET_PORT ? process.env.SOCKET_PORT : 8001;
//import socketServer from './socket/socketServices';
/** add clustering in node part */
const os = require("os");
const cluster = require("cluster");

const clusterWorkerSize = os.cpus().length;

if (env == "local" ||  clusterWorkerSize > 1) {
  const app = express();

  // Access-Control-Allow-Origin
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );
  app.use(logger("dev"));
  app.use(
    bodyParser.json({
      limit: "50mb",
    })
  );

  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      parameterLimit: 100000,
      extended: true,
    })
  );

  app.use(express.static(path.join(__dirname, "public")));
  var options = {};
  

  app.use("/api", routes);

  app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
      // we had a joi error, let's return a custom 400 json response
      res
        .status(400)
        .json(failAction(err.error.message.toString().replace(/[\""]+/g, "")));
    } else {
      // pass on to another error handler
      next(err);
    }
  });

  app.get("/", (req, res) =>
    res.send(`<h1>App ${env} environment</h1>`)
  );

  process.on("uncaughtException", (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled rejection at ", promise, `reason: ${err.message}`);
    process.exit(1);
  });
  // app.listen(port, () => console.log(`Backend is running on port ${port}`));
  var server = http.createServer(app);
  //socketServer(server);
  server.listen(port, function () {
    console.log(
      `Express server listening on port ${port} and worker ${process.pid}`
    );
  });
} 
