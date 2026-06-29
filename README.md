# 🛡️ Minecraft - NoCode Edition

<div align="center">
  <img src="https://1000marcas.net/wp-content/uploads/2020/01/Minecraft-Logo.png" width="300" alt="Minecraft Logo" />
  <p><strong>Desarrollado para la materia: Programación Web Avanzada - UNCOMA</strong></p>
</div>

---

## 👥 Equipo de Desarrollo (Grupo Minecraft NoCode)

| Rol                    | Nombre           | GitHub                                                 |
| :--------------------- | :--------------- | :----------------------------------------------------- |
| **Project Manager**    | Erick Gonzalez   | [@DevEriik](https://github.com/DevEriik)               |
| **Frontend Developer** | Daniela Oñatibia | [@DanielaOnatibia](https://github.com/DanielaOnatibia) |
| **Frontend Developer** | Abril Gavilan    | [@abrilgavilan11](https://github.com/abrilgavilan11)   |

---

## 📜 Descripción del Proyecto

Esta es una **Multi Pages** diseñada como una enciclopedia interactiva del universo de Minecraft. El objetivo es permitir a los usuarios explorar criaturas (mobs) e ítems, visualizar sus detalles técnicos y gestionar su propio inventario de favoritos.

### ✨ Características Principales

- **🔒 Seguridad y Control de Roles:** Autenticación robusta utilizando **JWT (JSON Web Tokens)**. Diferenciación de roles (Admin/Client) para proteger rutas y habilitar permisos de edición/eliminación en tiempo real.
- **👾 Creador de Skins:** Interfaz visual para personalizar un avatar de Minecraft (color de piel, cabello y ropa).
- **👁️ Realidad Aumentada (AR):** Motor de AR web-based impulsado por **MindAR** y **Three.js**. Los usuarios pueden escanear un código QR generado dinámicamente y visualizar su skin en 3D sobre un marcador físico, sin necesidad de instalar aplicaciones nativas.
- **🌍 Multi-idioma:** Soporte completo para Español e Inglés (i18next) con persistencia en `localStorage`.
- **🖱️ Scroll Infinito:** Carga dinámica de elementos desde nuestra API para una navegación fluida.
- **⭐ Sistema de Inventario:** Guarda tus criaturas e ítems favoritos de forma persistente y segura en la base de datos, vinculados a tu sesión.
- **📱 Diseño Responsive:** Estilizado al 100% con **Tailwind CSS v4**.

---

## 🛠️ Tecnologías Utilizadas

![React](https://img.shields.io/badge/react-%23202322.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![MindAR](https://img.shields.io/badge/MindAR-AR_Web-blueviolet?style=for-the-badge)

---

## 🚀 Guía de Instalación

Sigue estos pasos para spawnear el proyecto en tu entorno local:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/DevEriik/MINECRAFT---NoCode-Edition.git](https://github.com/DevEriik/MINECRAFT---NoCode-Edition.git)
    ```
2.  **Entrar a la carpeta:**
    ```bash
    cd MINECRAFT---NoCode-Edition
    ```
3.  **Instalar dependencias:**
    ```bash
    npm install
    ```
4.  **Correr en modo desarrollo:**
    ```bash
    npm run dev
    ```

---

## 🗺️ Mapa del Proyecto (Estructura)

Siguiendo los lineamientos de la cátedra, el proyecto se organiza de la siguiente manera:

```text
├── src/
│   ├── components/        # Componentes reutilizables (Card, Header, ARBanner, SkinRender)
│   ├── pages/             # Vistas principales (Home, Details, Favorites, CreateSkin)
│   ├── context/           # Estado Global (AuthContext)
│   ├── services/          # Lógica de Fetch, Interceptores de Axios y conexión a la API
│   ├── locales/           # Archivos de traducción (ES/EN)
│   ├── utils/             # Funciones de apoyo (construcción de mallas 3D para AR)
│   ├── App.jsx            # Enrutador principal y protección de rutas
│   └── main.jsx           # Punto de entrada
├── public/
│   └── avatars/           # Archivos target.mind para el tracking de AR
├── CODEOWNERS             # Reglas de protección de ramas
└── tailwind.config.js     # Configuración de estilos
```

---

## ⚙️ Metodología de Trabajo

Como parte del aprendizaje de gestión, este proyecto utiliza:

- **GitHub Projects (Kanban):** Organización de tareas y seguimiento de estados (To Do, In Progress, Done).
- **Git Flow Profesional:** Uso de ramas `main` y `developer`, con **Branch Protection Rules** y revisiones obligatorias vía Pull Requests.
- **Discord Webhooks:** Notificaciones automáticas de actividad en el repositorio.

---

<div align="center">
  <p>Hecho con ❤️ por el equipo NoCode</p>
</div>
