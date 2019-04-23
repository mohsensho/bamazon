DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  product_sales DECIMAL(10,2) DEFAULT 0,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("On my Knees", "Books", 99.99, 120),
  ("Spider Man", "Video Games", 79.99, 3000),
  ("Knives", "Kitchen", 299.00, 20),
  ("Barbe", "Toys", 25.00, 50),
  ("Apple Smart Watch", "Tech", 249.99, 40),
  ("Iphone 7", "Tech", 849.99, 50),
  ("Teddy Bear", "Toys", 20.00, 60),
  ("Bat Man", "Toys", 25.00, 100),
  ("Scarface", "Films", 9.99, 140),
  ("Godfather", "Films", 9.99, 299);
  ("Pliars", "Tools", 9.99, 140),
  ("Hammer", "Tools", 9.99, 299);

  CREATE TABLE departments(
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  primary key(department_id)
);


INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 100),
  ("Tools", 150),
  ("Tech", 250),
  ("Video Games", 50),
  ("Kitchen", 400),
  ("Toys", 25),
  ("Films", 0);
