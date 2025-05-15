# 🧠 Sayro — Plataforma para Diseñadores y Desarrolladores

Sayro es una plataforma web que conecta diseñadores y desarrolladores para compartir proyectos, descubrir inspiración y construir comunidad.

## ✨ Características

- 📌 Publicación de posts con título, descripción, imagen, contenido y etiquetas.
- ❤️ Likes, 💬 comentarios y 📁 guardado de publicaciones.
- 🔐 Autenticación con JWT y sesiones vía cookies.
- 👤 Perfil de usuario con datos personales, likes y guardados.
- 🌙 Interfaz oscura moderna y responsiva.
- 🛡️ Administración básica por roles (`user` y `admin`).

---

## 🚀 Tecnologías utilizadas

- **Frontend:** React + TailwindCSS + React Router
- **Backend:** Node.js + Express + MongoDB + Mongoose
- **Autenticación:** JWT (guardado en cookies HTTP-only)
- **Subidas de imagen:** Multer
- **Notificaciones:** react-toastify
- **Iconos:** lucide-react

---

## 🛠 Instalación y configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/Josep-Oriol/sayro.git
cd sayro
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env` en el directorio raíz:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/sayro
JWT_SECRET=tu_clave_secreta
```

### 4. Inicia el proyecto

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## 📁 Estructura del proyecto (Frontend)

```
src/
├── assets/             # Imágenes, íconos, etc.
├── components/         # Componentes reutilizables (Nav, Footer, Cards...)
│   └── profile/        # Subcomponentes del perfil
├── context/            # Contexto global (AuthContext)
├── pages/              # Vistas principales (Home, Login, Register, Profile)
├── utils/              # Rutas, helpers
├── App.jsx
└── main.jsx
```

---


## 👤 Panel de perfil

- Secciones:
  - Mi perfil
  - Likes
- Funciones:
  - Editar perfil
  - Recuperar contraseña
  - Eliminar cuenta (Zona de peligro)

---

## 🧑‍💻 Autor

Creado por [Josep Oriol](https://github.com/Josep-Oriol)

Diseño, desarrollo full-stack, UI/UX.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---
