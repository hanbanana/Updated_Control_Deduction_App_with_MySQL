USE bc_deduction_db;

-- Create the table plans.
CREATE TABLE input_truck_payment_db
(
id int NOT NULL AUTO_INCREMENT,
input_truck_payment_truck_no varchar(45) NOT NULL,
input_truck_payment_owner_id varchar(45) NOT NULL,
input_truck_payment_owner_name varchar(45) NOT NULL,
input_truck_payment_driver_id varchar(45) NOT NULL,
input_truck_payment_driver_name varchar(45) NOT NULL,
input_truck_payment_truck_total_amount varchar(45) NOT NULL,
input_truck_payment_down_payment varchar(45) NOT NULL,
input_truck_payment_sale_date varchar(45) NOT NULL,
input_truck_payment_pay_month varchar(45) NOT NULL,
input_truck_payment_paid_amount varchar(45) NOT NULL,
input_truck_payment_paid_date varchar(45) NOT NULL,
input_truck_payment_balance_amount varchar(45) NOT NULL,
created_date DATETIME NOT NULL,
updated_date TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);