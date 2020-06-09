DROP DATABASE IF EXISTS bc_deduction;
CREATE DATABASE bc_deduction;
USE bc_deduction;

-- Create the table plans.
CREATE TABLE b_truck
(
id int NOT NULL AUTO_INCREMENT,
truck_code varchar(5) NOT NULL,
truck_name VARCHAR(45) NOT NULL,
created_date DATETIME NOT NULL,
updated_date TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO Truck_List (BL) VALUES ('TEST1234');