import express, { Application } from 'express';
import bodyParser from "body-parser";

// Controllers (route handlers)
import * as DataController from "./controllers/Data";
import * as LogsController from "./controllers/Logs";

// Create Express server
const app: Application = express();

// Express configuration
app.set("port", process.env.SERVER_PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/**
 * Primary app routes.
 */
app.get("/data", DataController.getData);
app.post("/addData", DataController.postData);
app.get("/logs", LogsController.getLogs);
app.post("/addLog", LogsController.postLog);

export default app;