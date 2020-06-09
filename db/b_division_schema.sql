DROP DATABASE IF EXISTS bc_deduction;
CREATE DATABASE bc_deduction;
USE bc_deduction;

-- Create the table plans.
CREATE TABLE b_division
(
id int NOT NULL AUTO_INCREMENT,
div_code varchar(3) NOT NULL,
div_name VARCHAR(45) NOT NULL,
created_date DATETIME NOT NULL,
updated_date TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO Truck_List (BL) VALUES ('TEST1234');


-- create_date : 'DATETIME' 'CURRENT_TIMESTAMP'
-- updated_date : 'TIMESTAMP' 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'