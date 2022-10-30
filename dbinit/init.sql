CREATE DATABASE IF NOT EXISTS patientsdb;

USE patientsdb;

DROP TABLE IF EXISTS patients;

CREATE TABLE patient (
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name  VARCHAR(255) DEFAULT NULL,
    email       VARCHAR(255) DEFAULT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT  UQ_Patients_Email UNIQUE (email)
)