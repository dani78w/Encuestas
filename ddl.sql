/*markdown
 #   Definicion de las tablas principales
 */

 -- Tabla `usuario`
 -- Esta tabla almacena información sobre los usuarios. Cada usuario tiene un ID único,
 -- un nombre y una fecha de nacimiento.
 DROP TABLE IF EXISTS usuario CASCADE;
 CREATE TABLE usuario (
     id SERIAL PRIMARY KEY,              -- 'id' es la clave primaria y debe ser único para cada usuario, SERIAL se autoincrementa.
     nombre TEXT,                        -- 'nombre' es un campo de texto que almacena el nombre del usuario.
     fecha_de_nacimiento TIMESTAMP       -- 'fecha_de_nacimiento' guarda la fecha de nacimiento del usuario.
 );

 -- Tabla `encuesta`
 -- Esta tabla guarda las encuestas creadas por los usuarios. Cada encuesta tiene un ID único,
 -- un título, un dueño (que es el usuario que crea la encuesta), y una fecha que podría ser la
 -- de creación o finalización de la encuesta.
 DROP TABLE IF EXISTS encuesta CASCADE;
 CREATE TABLE encuesta (
     id SERIAL PRIMARY KEY,                 -- 'id' es la clave primaria y debe ser único para cada encuesta, SERIAL se autoincrementa.
     titulo TEXT,                           -- 'titulo' es un campo de texto que almacena el título de la encuesta.
     dueno INT NOT NULL,                    -- 'dueno' es una clave foránea que referencia el 'id' de la tabla 'usuario'. No puede ser nulo.
     fecha TIMESTAMP,                       -- 'fecha' puede ser la fecha de creación o finalización de la encuesta.
     FOREIGN KEY (dueno) REFERENCES usuario(id) -- La restricción de clave foránea asegura que 'dueno' corresponda a un 'id' de 'usuario'.
 );

 -- Tabla `respuesta_encuesta`
 -- Esta tabla se utiliza para almacenar las respuestas de los usuarios a las encuestas.
 -- Tiene un registro por cada respuesta de usuario a una encuesta, indicando si la respuesta fue 'sí' o 'no'.
 DROP TABLE IF EXISTS respuesta_encuesta CASCADE;
 CREATE TABLE respuesta_encuesta (
     id_usuario INT,                               -- 'id_usuario' es una clave foránea que referencia al usuario que responde.
     id_encuesta INT,                              -- 'id_encuesta' es una clave foránea que referencia la encuesta respondida.
     respuesta BOOLEAN,                            -- 'respuesta' es un valor booleano donde TRUE representa 'sí' y FALSE 'no'.
     PRIMARY KEY (id_usuario, id_encuesta),        -- La combinación de 'id_usuario' y 'id_encuesta' es única y sirve como clave primaria compuesta.
     FOREIGN KEY (id_usuario) REFERENCES usuario(id),      -- Restricción de clave foránea para 'id_usuario'.
     FOREIGN KEY (id_encuesta) REFERENCES encuesta(id)     -- Restricción de clave foránea para 'id_encuesta'.
 );



 /*markdown
 #   Auditorias
 */

 -- Tabla `auditoria_usuario`
 -- Esta tabla existe para registrar las acciones realizadas sobre la tabla `usuario`.
 DROP TABLE IF EXISTS auditoria_usuario CASCADE;
 CREATE TABLE IF NOT EXISTS auditoria_usuario (
     auditoria_id SERIAL PRIMARY KEY,     -- 'auditoria_id' es la clave primaria y se autoincrementa.
     operacion VARCHAR(10),               -- 'operacion' almacena el tipo de acción realizada (por ejemplo, 'INSERT').
     usuario_id INT,                      -- 'usuario_id' referencia el ID del usuario afectado por la acción.
     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 'timestamp' almacena la fecha y hora cuando se realizó la acción.
 );
 -- Esta tabla existe para registrar las acciones realizadas sobre la tabla `encuesta`.
 DROP TABLE IF EXISTS auditoria_encuesta CASCADE;
 CREATE TABLE IF NOT EXISTS auditoria_encuesta (
     auditoria_id SERIAL PRIMARY KEY,        -- 'auditoria_id' es la clave primaria y se autoincrementa.
     operacion VARCHAR(10),                  -- 'operacion' almacena el tipo de acción realizada (por ejemplo, 'INSERT').
     encuesta_id INT,                        -- 'encuesta_id' referencia el ID de la encuesta afectada por la acción.
     usuario_dueno_id INT,                   -- 'usuario_dueno_id' referencia el ID del usuario dueño de la encuesta.
     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 'timestamp' almacena la fecha y hora cuando se realizó la acción.
 );

 /*markdown
 #   Triggers principales
 */

 -- Trigger que se activa después de que un nuevo usuario es insertado en la tabla `usuario`
 DROP FUNCTION IF EXISTS registrar_auditoria_usuario();
 CREATE OR REPLACE FUNCTION registrar_auditoria_usuario()
 RETURNS TRIGGER AS $$
 BEGIN
     INSERT INTO auditoria_usuario(operacion, usuario_id, timestamp)
     VALUES ('INSERT', NEW.id, NOW());
     RETURN NEW;
 END;
 $$ LANGUAGE plpgsql;
 DROP TRIGGER IF EXISTS trg_auditoria_usuario_insert ON encuesta;
 CREATE TRIGGER  trg_auditoria_usuario_insert
 AFTER INSERT ON usuario
 FOR EACH ROW
 EXECUTE FUNCTION registrar_auditoria_usuario();


 -- Por último, se define una función y un trigger similar para la tabla `encuesta`
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
