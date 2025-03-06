CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
     imagen TEXT
);

CREATE TABLE viajes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    destino TEXT[]  NOT NULL, 
    descripcion TEXT  NOT NULL,
    precio NUMERIC(10,2)  NOT NULL,
    imagen VARCHAR(255)  NOT NULL,
    fecha_salida DATE  NOT NULL,
    duracion INTEGER  NOT NULL,
    capacidad INTEGER  NOT NULL,
    features TEXT[]  NOT NULL
);

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_viaje INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_viaje) REFERENCES viajes(id) ON DELETE CASCADE
);

CREATE TABLE mis_resenas (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_viaje INT NOT NULL,
    valoracion INT CHECK (valoracion BETWEEN 1 AND 5), -- Valor entre 1 y 5
    descripcion TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_viaje) REFERENCES viajes(id) ON DELETE CASCADE
);

CREATE TABLE resenas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    id_viaje INT NOT NULL,
    valoracion INT CHECK (valoracion BETWEEN 1 AND 5), -- Valor entre 1 y 5
    descripcion TEXT,
    FOREIGN KEY (id_viaje) REFERENCES viajes(id) ON DELETE CASCADE
);

CREATE TABLE mis_viajes (
    id_usuario INT NOT NULL,
    id_viaje INT NOT NULL,
    PRIMARY KEY (id_usuario, id_viaje),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_viaje) REFERENCES viajes(id) ON DELETE CASCADE
);

INSERT INTO usuario (nombre, apellido, email, password) VALUES
('Fernanda', 'Pérez', 'fernanda.perez@gmail.com', 'pass1234'),
('Romina', 'Gacitúa', 'romina.gacitua@hotmail.com', 'romi5678'),
('Faviana', 'López', 'faviana.lopez@yahoo.com', 'favi9012'),
('Carlos', 'Reyes', 'carlos.reyes@gmail.com', 'carlospass'),
('Maria', 'Pérez', 'maria.perez@gmail.com', 'mas1234'),
('Juan', 'Gacitúa', 'juan.gacitua@hotmail.com', 'gaci5277'),
('Ana', 'López', 'ana.lopez@yahoo.com', 'ana1523'),
('Franco', 'Reyes', 'franco.reyes@gmail.com', 'fran78542'),
('Ana', 'Torres', 'ana.torres@hotmail.com', 'torres2023'),
('Cecilia', 'Torres', 'ceci.torres@hotmail.com', 'ceci2023');

INSERT INTO viajes (nombre, destino, descripcion, precio, imagen, fecha_salida, duracion, capacidad, features) VALUES
('Crucero por el Caribe', ARRAY['Bahamas', 'Jamaica', 'Cuba'], 'Un emocionante crucero por el Caribe.', 2500.00, 'caribe.jpg', '2025-03-01', 7, 200, ARRAY['Todo incluido', 'Piscina infinita', 'Shows nocturnos']),
('Crucero por el Mediterráneo', ARRAY['Italia', 'Grecia', 'España'], 'Descubre las maravillas del Mediterráneo.', 3200.00, 'mediterraneo.jpg', '2025-04-10', 10, 250, ARRAY['Cenas gourmet', 'Spa de lujo', 'Excursiones guiadas']),
('Crucero por Alaska', ARRAY['Alaska', 'Canadá', 'Groenlandia'], 'Explora los glaciares y la vida silvestre.', 2800.00, 'alaska.jpg', '2025-05-20', 12, 300, ARRAY['Naturaleza', 'Tours en kayak', 'Auroras boreales']),
('Crucero por las Islas Griegas', ARRAY['Santorini', 'Mykonos', 'Atenas'], 'Un recorrido espectacular por las icónicas islas griegas.', 3000.00, 'islas_griegas.jpg', '2025-06-05', 8, 220, ARRAY['Vistas impresionantes', 'Buceo', 'Cultura e historia']),
('Crucero por Sudamérica', ARRAY['Colombia', 'Perú', 'Ecuador'], 'Aventura por los países sudamericanos.', 2000.00, 'sudamerica.jpg', '2025-07-15', 14, 250, ARRAY['Cenas gourmet', 'Spa de lujo', 'Festivales', 'Noches de salsa']),
('Crucero por el Sur de Chile', ARRAY['Valparaíso', 'Chiloé (Castro)', 'Puerto Natales', 'Torres del Paine'], 'Explora la belleza del sur de Chile, desde los colores de Valparaíso hasta los impresionantes fiordos de la Patagonia.', 2700.00, 'sur_chile.jpg', '2025-08-01', 10, 180, ARRAY['Tracking', 'Parques Nacionales', 'Cultura y Gastronomía'])

INSERT INTO favoritos (id_usuario, id_viaje) VALUES
(1, 2), -- Fernanda: Mediterráneo
(1, 4), -- Fernanda: Islas Griegas
(2, 1), -- Romina: Caribe
(3, 3), -- Faviana: Alaska
(4, 5); -- Carlos: Sudamérica

INSERT INTO resenas (id_usuario, id_viaje, valoracion, descripcion) VALUES
(1, 2, 5, 'Un viaje espectacular, vistas increíbles y excelente servicio.'),
(2, 1, 4, 'Muy bonito, pero creo que podría haber mejorado la comida.'),
(3, 3, 5, 'Una experiencia inolvidable, los glaciares fueron impresionantes.'),
(4, 5, 3, 'El itinerario fue interesante, pero algunos lugares no cumplieron expectativas.'),
(5, 4, 4, 'Hermosos paisajes y un crucero muy cómodo.');



INSERT INTO mis_viajes (id_usuario, id_viaje) VALUES
(1, 2), -- Fernanda: Mediterráneo
(1, 4), -- Fernanda: Islas Griegas
(2, 1), -- Romina: Caribe
(3, 3), -- Faviana: Alaska
(4, 5); -- Carlos: Sudamérica

SELECT * FROM usuario;

SELECT * FROM viajes;


SELECT * FROM favoritos;


SELECT * FROM mis_resenas;


SELECT * FROM resenas;


SELECT * FROM mis_viajes;