NestJS Google OAuth2

Backend desarrollado con NestJS para implementar autenticación mediante Google OAuth2, persistencia de usuarios con TypeORM y MySQL, y generación de tokens JWT.

Tecnologías utilizadas
NestJS
TypeScript
Passport
Google OAuth2
JWT
TypeORM
MySQL

Requisitos previos

Antes de ejecutar el proyecto se necesita tener instalado:

Node.js v18 o superior
npm
MySQL o WAMP con MySQL funcionando
Una cuenta de Google Cloud Console con credenciales OAuth 2.0
Instalación
1. Clonar el repositorio
git clone URL_DEL_REPOSITORIO
2. Ingresar al proyecto
cd nestjs-google-oauth
3. Instalar las dependencias
npm install
4. Configurar las variables de entorno

Crear un archivo .env en la raíz del proyecto tomando como referencia el archivo .env.example.

El archivo .env debe contener:

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=nestjs_google_oauth

GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/redirect

JWT_SECRET=tu_jwt_secret

Reemplazar los valores de Google por las credenciales obtenidas desde Google Cloud Console.

5. Configurar la base de datos

Crear una base de datos MySQL llamada:

nestjs_google_oauth

El proyecto utiliza TypeORM para gestionar la persistencia de los usuarios.

6. Configurar Google OAuth2

En Google Cloud Console se debe configurar una aplicación OAuth 2.0.

La URL de redirección autorizada utilizada por el proyecto es:

http://localhost:3000/auth/google/redirect
7. Ejecutar el servidor

Para iniciar el proyecto en entorno de desarrollo:

npm run start:dev

El servidor estará disponible en:

http://localhost:3000
Autenticación con Google

Para iniciar el proceso de autenticación acceder a:

http://localhost:3000/auth/google

El usuario será redirigido a Google para iniciar sesión.

Después de autenticarse correctamente, Google redirigirá al endpoint:

http://localhost:3000/auth/google/redirect

El backend valida o registra al usuario en la base de datos y genera un token JWT.

Endpoints principales
Iniciar autenticación
GET /auth/google

Inicia el flujo de autenticación mediante Google OAuth2.

Callback de Google
GET /auth/google/redirect

Recibe la respuesta de Google, procesa el usuario autenticado y genera el JWT.

Variables sensibles

El archivo .env contiene información sensible, como las credenciales de Google y el secreto utilizado para firmar los JWT.

Por este motivo, .env no se incluye en el repositorio.

El archivo .env.example contiene las variables necesarias para configurar el proyecto y sí debe incluirse en el repositorio.