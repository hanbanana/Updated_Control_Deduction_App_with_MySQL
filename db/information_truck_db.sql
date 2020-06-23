DROP DATABASE IF EXISTS bc_deduction_db;
CREATE DATABASE bc_deduction_db;
USE bc_deduction_db;

-- Create the table plans.
CREATE TABLE information_truck_db
(
id int NOT NULL AUTO_INCREMENT,
information_owner_no varchar(45) NOT NULL,
information_owner_us_plate_no VARCHAR(45) NOT NULL,
information_owner_mx_plate VARCHAR(45) NOT NULL,
information_owner_maker VARCHAR(45) NOT NULL,
information_owner_model varchar(45) NOT NULL,
information_owner_year VARCHAR(45) NOT NULL,
information_owner_color VARCHAR(45) NOT NULL,
information_owner_owner_no VARCHAR(45) NOT NULL,
information_owner_owner_name varchar(45) NOT NULL,
information_owner_driver_id VARCHAR(45) NOT NULL,
information_owner_driver_name VARCHAR(45) NOT NULL,
information_owner_registration_name VARCHAR(45) NOT NULL,
information_owner_rfid_tag VARCHAR(45) NOT NULL,
created_date DATETIME NOT NULL,
updated_date TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);