DROP DATABASE IF EXISTS bamazon_DB;

CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE department(
	department_name VARCHAR(100) NOT NULL,
	over_head_costs DOUBLE NOT NULL
);

USE bamazon_DB;

CREATE TABLE product(
	item_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	product_name VARCHAR (100) NOT NULL,
	department_name VARCHAR (100) NOT NULL,
	price DOUBLE NOT NULL,
	stock_quantity INT NOT NULL,
	product_sales DOUBLE NOT NULL
);
