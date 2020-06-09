USE bc_deduction_db;

-- Create the table plans.
CREATE TABLE input_part_purchase_db
(
id int NOT NULL AUTO_INCREMENT,
input_part_purchase_status varchar(45) NOT NULL,
input_part_purchase_type varchar(45) NOT NULL,
input_part_purchase_truck_no varchar(45) NOT NULL,
input_part_purchase_owner_is varchar(45) NOT NULL,
input_part_purchase_driver_id varchar(45) NOT NULL,
input_part_purchase_invoice_no varchar(45) NOT NULL,
input_part_purchase_amount varchar(45) NOT NULL,
input_part_purchase_pay_week varchar(45) NOT NULL,
input_part_purchase_date varchar(45) NOT NULL,
input_part_purchase_add_pay varchar(45) NOT NULL,
input_part_purchase_cr varchar(45) NOT NULL,
input_part_purchase_invoice varchar(45) NOT NULL,
input_part_purchase_desc varchar(45) NOT NULL,
created_date DATETIME NOT NULL,
updated_date TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);