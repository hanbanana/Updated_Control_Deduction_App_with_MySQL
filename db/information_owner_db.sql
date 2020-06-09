DROP DATABASE IF EXISTS bc_deduction_db;
CREATE DATABASE bc_deduction_db;
USE bc_deduction_db;

-- Create the table plans.
CREATE TABLE information_owner_db
(
id int NOT NULL AUTO_INCREMENT,
information_owner_no varchar(45) NOT NULL,
information_owner_name VARCHAR(45) NOT NULL,
information_owner_address VARCHAR(45) NOT NULL,
information_owner_tel VARCHAR(45) NOT NULL,
created_date DATETIME NOT NULL,
updated_date TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO Truck_List (BL) VALUES ('TEST1234');


-- create_date : 'DATETIME' 'CURRENT_TIMESTAMP'
-- updated_date : 'TIMESTAMP' 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'