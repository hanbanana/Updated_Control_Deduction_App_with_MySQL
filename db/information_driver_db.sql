USE bc_deduction_db;

-- Create the table plans.
CREATE TABLE information_driver_db
(
id int NOT NULL AUTO_INCREMENT,
information_driver_no varchar(45) NOT NULL,
information_driver_name VARCHAR(45) NOT NULL,
information_driver_license_id VARCHAR(45) NOT NULL,
information_driver_rfc VARCHAR(45) NOT NULL,
information_driver_ife VARCHAR(45) NOT NULL,
information_driver_address VARCHAR(45) NOT NULL,
created_date DATETIME NOT NULL,
updated_date TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);