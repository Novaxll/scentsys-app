-- database.sql
CREATE DATABASE IF NOT EXISTS scentsys_db;
USE scentsys_db;

CREATE TABLE marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    pais_origen VARCHAR(100) NOT NULL,
    fundacion INT NOT NULL CHECK (fundacion >= 1700),
    categoria VARCHAR(50) NOT NULL,
    logo_imagen VARCHAR(255)
);

CREATE TABLE perfumes (
    id_perfume INT AUTO_INCREMENT PRIMARY KEY,
    id_marca INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    ml INT NOT NULL CHECK (ml > 0),
    concentracion VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    imagen_perfume VARCHAR(255),
    CONSTRAINT fk_marca 
        FOREIGN KEY (id_marca) 
        REFERENCES marcas(id_marca) 
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
);

-- Inserts de Prueba
INSERT INTO marcas (nombre, pais_origen, fundacion, categoria) VALUES 
('Giorgio Armani', 'Italia', 1975, 'Diseñador'),
('Mancera', 'Francia', 2008, 'Nicho');

INSERT INTO perfumes (id_marca, nombre, ml, concentracion, precio) VALUES 
(1, 'Acqua Di Gio Profondo', 100, 'EDP', 130.00),
(2, 'French Riviera', 120, 'EDP', 150.00);
