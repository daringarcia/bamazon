USE bamazon;

INSERT INTO department (department_name, over_head_costs)
VALUES 	('Fitness', 20350),
		('Grooming', 3250),
		('Hygiene', 5000),
		('Home', 2700),
		('Pets', 2000),
		('Electronics', 750),
		('Music', 400),
		('Video Games', 3000);

INSERT INTO product (product_name, department_id, price, stock_quantity, product_sales) 
VALUES ("Muay Thai Shin Guards", 1, 65.00, 100, 0),
	   ("WaterRower", 1, 1100.00, 25, 0),
	   ("Beard and Hair Trimmer", 2, 65.00, 100, 0),
	   ("Electric Toothbrush", 3, 50.00, 200, 0),
	   ("LED Lights 6pk", 4, 18.00, 300, 0),
	   ("Covered Litter Box/End Table", 5, 80.00, 50, 0),
	   ("Wifi Range Extender", 6, 30.00, 50, 0),
	   ("16oz Leather Boxing Gloves", 1, 62.00, 100, 0),
	   ("Learn Guitar - Beginners' Guide", 7, 20.00, 40, 0),
	   ("Red Dead Redemption", 8, 60.00, 1000, 0);