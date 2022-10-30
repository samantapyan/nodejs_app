import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import Response from "./domain/response.js"
import logger from "./util/logger.js";
import HttpStatus from "./controller/patient.controller.js";
import PatientRoutes from "./rotes/patient.route.js"
import patientRotes from "./rotes/patient.route.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());


app.use('/patients', patientRotes);
app.all("/", (req, res) => res.send(new Response(
  HttpStatus.OK.code, HttpStatus.OK.status, "Patient API, v1.0.0",
  {
    patients: {name: "TEST"}
  }
)));
app.all("*", (req, res) => res.status(HttpStatus.NOT_FOUND.status));
app.listen(PORT, () => logger.info(`SERVER RUNNING ON ${ip.address()}: ${PORT}`));
