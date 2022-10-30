import express from "express";
import {
  getPatients,
  createPatient,
  deletePatient,
  updatePatient,
  getPatient
} from "../controller/patient.controller.js";

const patientRotes = express.Router();

patientRotes.route('/')
.get(getPatients)
.post(createPatient)

patientRotes.route("/:id")
.get(getPatient)
.put(updatePatient)
.delete(deletePatient)

export default patientRotes;
