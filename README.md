# Spotify Clone – Full Stack App

  Clon funcional de Spotify desarrollado con un stack Full Stack moderno, enfocado en reproducción de música, gestión de canciones y almacenamiento en la nube. El proyecto replica las funcionalidades principales de Spotify, permitiendo subir canciones, almacenarlas en la nube y reproducirlas desde una interfaz web moderna.


## 🔑 Credenciales para probar la APP

Para probar la aplicación puedes registrar un nuevo usuario o utilizar las siguientes credenciales (si ejecutaste el seed)

|       Usuario        | Contraseña |
| :------------------: | :--------: |
| `admin@spotify.com ` | `admin123` |

## 🏗️ Arquitectura y Diseño

El proyecto sigue una arquitectura Monolítica Modular, diseñada para facilitar la escalabilidad y el mantenimiento, separando claramente las responsabilidades.

Patrón de Diseño
Se utiliza el patrón Controller-Service-Data Access:

Router (Network): Define los endpoints y pasa la petición al controlador.

Controller: Gestiona la petición HTTP (Request/Response) y maneja los errores.

Service: Contiene toda la lógica de negocio pura (Cálculo de rachas, validación de tareas activas, lógica Pomodoro).

Prisma (ORM): Abstrae la conexión y consultas a la base de datos PostgreSQL.


## 🚀 Tecnologías utilizadas
### Frontend

  ⚛️ React
  
  🎨 CSS / Tailwind 
  
  🎧 Reproductor de audio HTML5

### Backend

  🟢 Node.js
  
  🚂 Express
  
  🔐 JWT (si aplica)
  
  📦 Prisma ORM

### Base de datos

  🐘 PostgreSQL

### Almacenamiento en la nube

  ☁️ Cloudinary

## Subida y gestión de archivos de audio

### Almacenamiento seguro de canciones

  📌 Funcionalidades principales
  
  🎶 Subida de canciones a Cloudinary
  
  ▶️ Reproducción de música en tiempo real
  
  🗂️ Gestión de canciones (crear, listar, eliminar)
  
  📄 Persistencia de datos con PostgreSQL
  
  🔄 Backend y frontend completamente conectados
  
  🧠 ORM Prisma para manejo de base de datos

## ⚙️ Instalación y Configuración Local

1. Clonar el repositorio

```bash
git clone https://github.com/DF2024/spotify.git
cd spotify
```

### Backend

```bash
npm install
```

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mstream?schema=public"
JWT_SECRET=tu_secreto_jwt
NODE_ENV = 'production'
```

```bash
# Ejecutar migraciones
npx prisma migrate dev --name init

# Poblar la base de datos (Roles y Status)
node prisma/seed.js
```

```bash
npm run dev
```

### Frontend

```bash
npm install
```

```bash
VITE_API_URL=https://spotify-production-5def.up.railway.app
```

```bash
npm run dev
```