# Playwright API Test Base

Proyecto base para pruebas de API con Playwright Test, usando JSON como datos de prueba y `zod` para validación de esquemas.

## Descripción

Este repositorio contiene una suite de pruebas de API orientada a la creación y validación de usuarios. Los casos de prueba se definen en `data/users/users.json`, se ejecutan con Playwright Test y validan respuestas con esquemas `zod`.

## Requisitos

- Node.js 18+ recomendado
- npm
- Servidor de la API disponible en el endpoint configurado

## Instalación

1. Clonar el repositorio

```bash
git clone <repo-url>
cd playwright-apitest-base
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar la URL base de la API

La base URL se toma de la variable de entorno `BASE_URL`. Si no está definida, usa el valor por defecto:

- `http://127.0.0.1:8000`

Ejemplo:

```bash
set BASE_URL=http://localhost:8000
```

También puedes crear un archivo `.env` en la raíz y definir:

```env
BASE_URL=http://localhost:8000
```

> Nota: en Windows PowerShell usa `setx BASE_URL "http://localhost:8000"` o configura `.env` si usas un cargador de variables.

## Endpoint principal

El conjunto de pruebas está diseñado para golpear el endpoint de creación de usuarios:

- `POST /users`

Casos incluidos en `data/users/users.json`:

- creación de usuario válido
- envío de payload vacío
- email inválido
- endpoint incorrecto (`/users-invalid`)
- prueba de performance

## Estructura del proyecto

```text
playwright-apitest-base/
├─ config/
│  └─ env.ts            # Configuración de variables de entorno y baseURL
├─ data/
│  └─ users/
│     └─ users.json     # Datos de prueba para la API de usuarios
├─ schemas/
│  └─ user.schema.ts    # Esquema Zod de respuesta de usuario
├─ tests/
│  └─ api/
│     └─ api-user.spec.ts  # Suite de pruebas de API
├─ utils/
│  ├─ apiClient.ts      # Cliente HTTP simple para Playwright requests
│  ├─ timer.ts          # Medición de tiempos de respuesta
│  └─ validator.ts      # Validación de esquemas con Zod
├─ playwright.config.ts # Configuración de Playwright Test
├─ package.json
└─ README.md
```

## Cómo funciona

1. `tests/api/api-user.spec.ts` carga los casos desde `data/users/users.json`.
2. Construye el `payload` y realiza la petición usando `utils/apiClient.ts`.
3. Valida el status esperado y, si corresponde, el esquema de respuesta con `utils/validator.ts`.
4. Guarda la respuesta en Allure como adjunto.

## Ejecución de pruebas

Ejecutar todas las pruebas:

```bash
npx playwright test
```

Ejecutar un archivo específico:

```bash
npx playwright test tests/api/api-user.spec.ts
```

Ejecutar solo pruebas con etiquetas no está configurado por defecto, pero los `tag` se usan como descripción de los casos.

## Reportes

La configuración usa `allure-playwright` como reporter. Para generar y ver reportes Allure, instala `allure-commandline` y ejecuta:

```bash
npx playwright test
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

## Personalización

- Agregar nuevos casos: editar `data/users/users.json`
- Validar nuevos esquemas: agregar nuevos archivos en `schemas/` y referenciarlos en `expected.schema`
- Cambiar la URL base: editar `config/env.ts` o usar `BASE_URL`

## Notas

- El proyecto usa `type: commonjs` en `package.json`.
- El endpoint por defecto es `POST /users` para crear usuarios.
- La respuesta válida espera campos: `email`, `name`, `surname`, `id`, `created_at`.

---

Si necesitas, puedo también agregar un script de npm para ejecutar las pruebas con un solo comando.
