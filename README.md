# Ayudantia 1-2024
Ayudantía para la materia Web 1

#### Comandos
- `npm install` para instalar las dependencias
- `npm run dev` para levantar el servidor

#### Base de datos
Se debe crear una base de datos llamada `contactos` y una tabla llamada `usuario` con los siguientes campos:
- id (INT AUTO_INCREMENT PRIMARY KEY)
- name (VARCHAR(100) NOT NULL)
- last_name (VARCHAR(100) NOT NULL)
- email (VARCHAR(100) NOT NULL UNIQUE)
- phone_number (VARCHAR(20) NOT NULL UNIQUE)
- password (VARCHAR(255) NOT NULL)
