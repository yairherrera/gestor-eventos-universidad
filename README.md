# 📅 Gestor de Eventos

Proyecto para la asignatura de Desarrollo Frontend. Una plataforma web hecha con React para gestionar eventos académicos de forma sencilla.

## 🚀 ¿Qué hace?

- CRUD completo de eventos (crear, ver, editar, eliminar)
- Búsqueda de eventos por título
- Inscripción de participantes con control de aforo
- Listado de participantes por evento
- Vista general de todos los participantes

## 🛠️ Tecnologías

- React 18 + Context API
- React Router v6
- Axios
- Bootstrap 5 + Bootstrap Icons
- json-server (backend simulado)
- Jest + React Testing Library
- concurrently

## 📦 Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/gestor-eventos-universidad.git
   cd gestor-eventos-universidad

2. Instala dependencias:
- npm install
Ejecuta con un solo comando:
- npm run dev
Backend: http://localhost:5000

Frontend: http://localhost:3000

🧪 Pruebas
bash
npm test
📁 Estructura
src/api/ – Configuración de Axios

src/context/ – Estado global (EventContext)

src/components/ – Componentes React

src/index.css – Estilos personalizados

⚠️ Nota
El backend es simulado con json-server. Los datos se guardan en db.json. Si cambias el puerto, actualiza src/api/api.js.


   