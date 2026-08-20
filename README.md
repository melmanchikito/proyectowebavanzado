# Plataforma de Aprendizaje — Proyecto Web Avanzado

## Descripción

Aplicación web desarrollada con Angular para una plataforma de aprendizaje. El proyecto está estructurado mediante rutas, páginas, componentes, servicios y una capa `core`, y contempla áreas para usuarios y administración.

Entre sus módulos se encuentran inicio, autenticación, aprendizaje, juegos, seguimiento de progreso, gestión de usuarios y administración.

## Tecnologías utilizadas

- Angular 21
- TypeScript
- Bootstrap 5
- RxJS
- npm
- Vitest
- Prettier

## Módulos y páginas

```text
src/app/pages/
├── admin/
├── aprendizaje/
├── home/
├── juegos/
├── login/
├── progreso/
└── usuarios/
```

El proyecto también contiene:

```text
src/app/
├── components/
├── core/
├── pages/
├── services/
├── app.config.ts
└── app.routes.ts
```

## Requisitos

- Node.js compatible con Angular 21.
- npm 10 o versión compatible.

## Instalación

```bash
git clone https://github.com/melmanchikito/proyectowebavanzado.git
cd proyectowebavanzado
npm install
```

## Servidor de desarrollo

```bash
npm start
```

o:

```bash
ng serve --port 4200
```

Luego abre:

```text
http://localhost:4200
```

## Compilar

```bash
npm run build
```

## Pruebas

```bash
npm test
```

## Formato del código

El proyecto incluye configuración de Prettier para mantener un formato consistente.

## Variables de entorno y seguridad

No publiques credenciales ni secretos en Git.

Si la aplicación requiere configuración local:

1. Agrega `.env` a `.gitignore`.
2. Crea un archivo `.env.example` únicamente con nombres de variables y valores de ejemplo.
3. Si alguna credencial real ya fue publicada, elimínala del repositorio y rótala.

Ejemplo:

```text
API_URL=http://localhost:3000
```

## Ejemplo de uso

La aplicación permite navegar por distintas áreas relacionadas con el aprendizaje y dispone de rutas diferenciadas para funcionalidades como juegos, progreso, usuarios y administración.

## Capturas de pantalla

Crea una carpeta `docs/screenshots/` y agrega, por ejemplo:

```md
![Inicio](docs/screenshots/home.png)
![Aprendizaje](docs/screenshots/aprendizaje.png)
![Panel administrativo](docs/screenshots/admin.png)
```

## Contribuciones

1. Crea una rama para cada cambio.
2. Mantén la separación entre páginas, componentes y servicios.
3. Ejecuta pruebas antes de enviar cambios.
4. No publiques archivos de entorno con credenciales.
5. Abre un pull request con una descripción clara.

## Autor

Germán Machado — [GitHub](https://github.com/melmanchikito)
