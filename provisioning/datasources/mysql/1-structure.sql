-- Drop the database if it exists
DROP DATABASE IF EXISTS supermarket;

-- Create the database
CREATE DATABASE supermarket;

-- Use the created database
USE supermarket;

-- Dimension table for products
CREATE TABLE dim_products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(255),
    category VARCHAR(255),
    default_price DECIMAL(10, 2) DEFAULT 0
);

-- Dimension table for stores
CREATE TABLE dim_stores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(255)
);

-- Dimension table for dates
CREATE TABLE dim_dates (
    id CHAR(10) PRIMARY KEY,
    date DATE
);

-- Dimension table for customers
CREATE TABLE dim_customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(50)
);

-- Fact table for sales
CREATE TABLE fact_sales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    store_id INT,
    date_id VARCHAR(10),
    price DECIMAL(10, 2),
    discount DECIMAL(5, 2),
    quantity INT,
    FOREIGN KEY (product_id) REFERENCES dim_products(id),
    FOREIGN KEY (store_id) REFERENCES dim_stores(id),
    FOREIGN KEY (date_id) REFERENCES dim_dates(id)
);

-- Fact for average basket
CREATE TABLE fact_average_basket (
    id INT PRIMARY KEY AUTO_INCREMENT,
    total_amount DECIMAL(10, 2),
    number_of_items INT,
    date_id VARCHAR(10),
    store_id INT,
    customer_id INT,
    FOREIGN KEY (store_id) REFERENCES dim_stores(id),
    FOREIGN KEY (customer_id) REFERENCES dim_customers(id),
    FOREIGN KEY (date_id) REFERENCES dim_dates(id)
);
