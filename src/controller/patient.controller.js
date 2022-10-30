import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERY from "../query/patient.query.js";

const HttpStatus = {
  OK: {
    code: 200,
    status: "OK"
  },
  CREATED: {
    code: 201,
    status: "CREATED"
  },
  NO_CONTENT: {
    code: 203,
    status: "NO_CONTENT"
  },
  BAD_REQUEST: {
    code: 400,
    status: "BAD_REQUEST"
  },
  NOT_FOUND: {
    code: 404,
    status: "NOT_FOUND"
  },
  INTERVAL_SERVER_ERROR: {
    code: 500,
    status: "INTERVAL_SERVER_ERROR"
  }
}

export const getPatients = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, fetching patients`),
  database.query(QUERY.SELECT_PATIENT, (error, results) => {
    if (!results) {
      res.status(HttpStatus.NO_CONTENT.code)
        .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, `No patients`))
    } else {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Patients list`))
    }
  })
}

export const createPatient = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, fetching patients`),
    database.query(QUERY.CREATE_PATIENT, Object.values(req.body) , (error, results) => {
      if (!results) {
        res.status(HttpStatus.INTERVAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERVAL_SERVER_ERROR.code, HttpStatus.INTERVAL_SERVER_ERROR.status, `Error via create`))
      } else {
        res.status(HttpStatus.CREATED.code)
        .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Patients list`))
      }
    })
}

export const getPatient = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, fetching patients`),
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
      if (!results[0]) {
        res.status(HttpStatus.NOT_FOUND.code)
          .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Error via GET`))
      } else {
        const patient = {
          id: results.insertedId,
          ...req.body,
          created_at: new Date()
        }
        res.status(HttpStatus.OK.code)
          .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Patients list`, results[0] ))
      }
    })
}

export const updatePatient = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, fetching patients`),
    database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
      if (!results[0]) {
        res.status(HttpStatus.NOT_FOUND.code)
          .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Error via GET`))
      } else {
        logger.info(`${req.method} ${req.originalurl}, UPDATING patients`);
        database.query(QUERY.UPDATE_PATIENT, Object.values(req.body), (error, results) => {
          if (!error) {
            res.status(HttpStatus.OK.code)
              .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Patients list`, {data:"patient"}))
          } else {
            logger.error(error.message);
            res.status(HttpStatus.INTERVAL_SERVER_ERROR.code)
              .send(new Response(HttpStatus.INTERVAL_SERVER_ERROR.code, HttpStatus.INTERVAL_SERVER_ERROR.status, `Error via update`))
          }
        })
      }
    })
}

export const deletePatient = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, deleting patients`);
    database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, results) => {
      if (results.affectedRows > 0) {
        res.status(HttpStatus.OK.code)
          .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Success`))
      } else {
        res.status(HttpStatus.NOT_FOUND.code)
          .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Patient BY ID ${req.params.id} was not found`))
      }
    })
}

export default HttpStatus;
