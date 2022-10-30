const QUERY = {
  SELECT_PATIENTS: "SELECT * FROM patients ORDER BY created_at DESC LIMIT 100",
  SELECT_PATIENT: "SELECT * FROM patients WHERE ID= ?",
  CREATE_PATIENT: "INSERT INTO patients SET first_name = ?, email = ? ",
  UPDATE_PATIENT: "INSERT INTO patients SET first_name = ?, email = ? ",
  DELETE_PATIENT: "DELETE FROM patients WHERE ID = ?",
};

export default QUERY;
