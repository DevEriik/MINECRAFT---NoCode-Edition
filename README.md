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

Esta es una **Single Page Application (SPA)** diseñada como una enciclopedia interactiva del universo de Minecraft. El objetivo es permitir a los usuarios explorar criaturas (mobs) e ítems, visualizar sus detalles técnicos y gestionar su propio inventario de favoritos.

### ✨ Características Principales

- **🌍 Multi-idioma:** Soporte completo para Español e Inglés (i18next) con persistencia en `localStorage`.
- **🖱️ Scroll Infinito:** Carga dinámica de elementos desde **MockAPI** para una navegación fluida.
- **🔍 Buscador Inteligente:** Filtros en tiempo real consultando directamente a la API.
- **⭐ Sistema de Inventario:** Guarda tus criaturas favoritas (Nether Star) con persistencia local.
- **📱 Diseño Responsive:** Estilizado al 100% con **Tailwind CSS v4**.
- **🚫 Error 404 Personalizado:** Pantalla temática "Te caíste al vacío" para rutas inexistentes.

---

## 🛠️ Tecnologías Utilizadas

![React](https://img.shields.io/badge/react-%23202322.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

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
│   ├── Components/        # Componentes reutilizables (Card, Header, Footer)
│   ├── Pages/             # Vistas principales (Home, Details, Favorites, NotFound)
│   ├── services/          # Lógica de Fetch y configuración de MockAPI
│   ├── locales/           # Archivos de traducción (ES/EN)
│   ├── App.jsx            # Enrutador principal
│   └── main.jsx           # Punto de entrada
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
