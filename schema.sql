DROP DATABASE IF EXISTS bc_deduction;
CREATE DATABASE bc_deduction;
USE bc_deduction;

-- Create the table plans.
CREATE TABLE b_division
(
id int NOT NULL AUTO_INCREMENT,
BL varchar(255) NOT NULL,
Terminal_Name VARCHAR(50) NOT NULL,
Container_No VARCHAR(50) NOT NULL,
Vassel_No varchar(255) NOT NULL,
ETA VARCHAR(50) NOT NULL,
Weight varchar(255) NOT NULL,
Seal_No VARCHAR(50) NOT NULL,
Delivery_Location varchar(255) NOT NULL,
Status_ VARCHAR(50) NOT NULL,
Return_ varchar(255) NOT NULL,
Close_ VARCHAR(50) NOT NULL,
Created DATETIME NOT NULL,
Updated_ TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO Truck_List (BL) VALUES ('TEST1234');