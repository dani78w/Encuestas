-- Tabla `usuario`
DROP TABLE IF EXISTS usuario CASCADE;
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre TEXT,
    fecha_de_nacimiento TIMESTAMP
);

-- Tabla `encuesta`
DROP TABLE IF EXISTS encuesta CASCADE;
CREATE TABLE encuesta (
    id SERIAL PRIMARY KEY,
    titulo TEXT,
    dueno INT NOT NULL,
    fecha TIMESTAMP,
    opciones JSONB,  -- Campo para almacenar las opciones de la encuesta en formato JSONB
    FOREIGN KEY (dueno) REFERENCES usuario(id)
);

-- Tabla `voto`
DROP TABLE IF EXISTS voto CASCADE;
CREATE TABLE voto (
    id SERIAL PRIMARY KEY,
    id_usuario INT,
    id_encuesta INT,
    opcion TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_encuesta) REFERENCES encuesta(id),
    UNIQUE (id_usuario, id_encuesta)  -- Un usuario solo puede votar una vez por encuesta
);

-- Tabla `auditoria_usuario`
DROP TABLE IF EXISTS auditoria_usuario CASCADE;
CREATE TABLE IF NOT EXISTS auditoria_usuario (
    auditoria_id SERIAL PRIMARY KEY,
    operacion VARCHAR(10),
    usuario_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla `auditoria_encuesta`
DROP TABLE IF EXISTS auditoria_encuesta CASCADE;
CREATE TABLE IF NOT EXISTS auditoria_encuesta (
    auditoria_id SERIAL PRIMARY KEY,
    operacion VARCHAR(10),
    encuesta_id INT,
    usuario_dueno_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Función y trigger para auditoría de inserción de usuario
DROP FUNCTION IF EXISTS registrar_auditoria_usuario();
CREATE OR REPLACE FUNCTION registrar_auditoria_usuario()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO auditoria_usuario(operacion, usuario_id, timestamp)
    VALUES ('INSERT', NEW.id, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_auditoria_usuario_insert ON usuario;
CREATE TRIGGER trg_auditoria_usuario_insert
AFTER INSERT ON usuario
FOR EACH ROW
EXECUTE FUNCTION registrar_auditoria_usuario();

-- Función y trigger para auditoría de inserción de encuesta
DROP FUNCTION IF EXISTS registrar_auditoria_encuesta();
CREATE OR REPLACE FUNCTION registrar_auditoria_encuesta()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO auditoria_encuesta(operacion, encuesta_id, usuario_dueno_id, timestamp)
    VALUES ('INSERT', NEW.id, NEW.dueno, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_auditoria_encuesta_insert ON encuesta;
CREATE TRIGGER trg_auditoria_encuesta_insert
AFTER INSERT ON encuesta
FOR EACH ROW
EXECUTE FUNCTION registrar_auditoria_encuesta();

-- Función para votar en una encuesta
CREATE OR REPLACE FUNCTION votar_en_encuesta(_id_usuario INT, _titulo_encuesta TEXT, _opcion TEXT)
RETURNS VOID AS $$
DECLARE
    encuesta_id INT;
    opciones JSONB;
BEGIN
    -- Obtener el ID de la encuesta por su título
    SELECT id, opciones INTO encuesta_id, opciones FROM encuesta WHERE titulo = _titulo_encuesta;

    -- Verificar si la opción existe en la encuesta
    IF NOT (_opcion = ANY (SELECT jsonb_array_elements_text(opciones))) THEN
        RAISE EXCEPTION 'La opción % no existe en la encuesta %', _opcion, _titulo_encuesta;
    END IF;

    -- Insertar el voto en la tabla de votos
    INSERT INTO voto (id_usuario, id_encuesta, opcion)
    VALUES (_id_usuario, encuesta_id, _opcion)
    ON CONFLICT (id_usuario, id_encuesta) DO UPDATE
    SET opcion = EXCLUDED.opcion;  -- Si el usuario ya votó, se actualiza su voto
END;
$$ LANGUAGE plpgsql;
