DROP DATABASE IF EXISTS bc_deduction;
CREATE DATABASE bc_deduction;
USE bc_deduction;

-- Create the table plans.
CREATE TABLE b_vendor
(
id int NOT NULL AUTO_INCREMENT,
vendor_div varchar(5) NOT NULL,
vendor_vendor_code VARCHAR(45) NOT NULL,
vendor_vendor_name VARCHAR(45) NOT NULL,
vendor_registration_name_1 VARCHAR(45) NOT NULL,
vendor_registration_name_2 VARCHAR(45) NOT NULL,
vendor_registration_address VARCHAR(45) NOT NULL,
vendor_lien_holder VARCHAR(45) NOT NULL,
created_date DATETIME NOT NULL,
updated_date TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO Truck_List (BL) VALUES ('TEST1234');