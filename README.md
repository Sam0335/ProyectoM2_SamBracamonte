# Blog API

API REST para gestionar autores y posts de un blog. Permite operaciones CRUD completas sobre autores y publicaciones con relaciones entre tablas.

Proyecto construido con Node.js, Express, y PostgreSQL. Desplegado en Railway.

## URL Base

[https://proyectom2sambracamonte-production.up.railway.app]

Todas las rutas están bajo `/api`.

## Tecnologías

- **Backend:** Node.js con Express
- **Base de datos:** PostgreSQL
- **ORM/Cliente DB:** pg (node-postgres)
- **Documentación:** OpenAPI 3.0 con Swagger UI
- **Deployment:** Railway

## Endpoints

### Autores

- `GET /api/authors` - Obtener todos los autores
- `GET /api/authors/:id` - Obtener un autor específico
- `POST /api/authors` - Crear un nuevo autor
- `PUT /api/authors/:id` - Actualizar un autor existente
- `DELETE /api/authors/:id` - Eliminar un autor

### Posts

- `GET /api/posts` - Obtener todos los posts
- `GET /api/posts/:id` - Obtener un post específico
- `GET /api/posts/author/:authorId` - Obtener posts de un autor
- `POST /api/posts` - Crear un nuevo post
- `PUT /api/posts/:id` - Actualizar un post existente
- `DELETE /api/posts/:id` - Eliminar un post

## Documentación Completa

La documentación interactiva completa de la API está disponible en:

**https://proyectom2sambracamonte-production.up.railway.app/api-docs**

Ahí puedes:
- Ver todos los endpoints con detalles completos
- Probar endpoints directamente desde el navegador
- Ver esquemas de datos y ejemplos
- Entender parámetros opcionales y requeridos

## Ejemplos de Uso

### Obtener todos los autores

```bash
curl https://proyectom2sambracamonte-production.up.railway.app/api/authors
```

**Respuesta:**

```json
{
    "id": 1,
    "name": "Ara Vega",
    "email": "arandela@example.com",
    "bio": "mejor jugador de geometry dash del mundo",
    "created_at": "2026-03-18T12:07:05.945Z"
},
{
    "id": 2,
    "name": "Marino Marino",
    "email": "marinero@example.com",
    "bio": "mejor jugador de bejeweled 3",
    "created_at": "2026-03-18T12:07:05.945Z"
},
{
    "id": 3,
    "name": "Orion Barrionuevo",
    "email": "onion@example.com",
    "bio": "I wont be a rock star, I will be a legend",
    "created_at": "2026-03-18T12:07:05.945Z"
}
```

### Obtener un autor específico

```bash
curl https://proyectom2sambracamonte-production.up.railway.app/api/authors/1
```

**Respuesta:**

```json
    {
    "id": 1,
    "name": "Ara Vega",
    "email": "arandela@example.com",
    "bio": "mejor jugador de geometry dash del mundo",
    "created_at": "2026-03-18T12:07:05.945Z"
    }
```

### Crear un nuevo autor

```bash
curl -X POST https://proyectom2sambracamonte-production.up.railway.app/api/authors
  -H "Content-Type: application/json"
  -d '{
    "name": "María Rodríguez",
    "email": "maria.rodriguez@example.com",
    "bio": "Ingeniera de software especializada en APIs"
    }'
```

**Respuesta:**

```json
{
  "id": 4,
  "name": "María Rodríguez",
  "email": "maria.rodriguez@example.com",
  "bio": "Ingeniera de software especializada en APIs",
  "created_at": "2026-03-18T16:45:00.000Z"
}
```

### Actualizar un autor

```bash
curl -X PUT https://proyectom2sambracamonte-production.up.railway.app/api/authors/4
  -H "Content-Type: application/json"
  -d '{
    "bio": "Ingeniera de software y speaker internacional"
    }'
```

**Respuesta:**

```json
{
  "id": 4,
  "name": "María Rodríguez",
  "email": "maria.rodriguez@example.com",
  "bio": "Ingeniera de software y speaker internacional",
  "created_at": "2024-02-06T16:45:00.000Z"
}
```

### Eliminar un autor

```bash
curl -X DELETE https://proyectom2sambracamonte-production.up.railway.app/api/authors/4
```

**Respuesta:**

```json
{
  "message": "Autor eliminado exitosamente"
}
```

### Obtener todos los posts

```bash
curl https://proyectom2sambracamonte-production.up.railway.app/api/posts
```

**Respuesta**

```json
{
  "id": 1,
  "author_id": 1,
  "title": "El drama de la alarma",
  "content": "Mi despertador y yo tenemos una relacion toxica: el intenta salvar mi carrera y yo lo golpeo sistematicamente cada cinco minutos. Al final me levanto con la energia de un mapache confundido, preguntandome si mi verdadera vocacion en la vida no es, en realidad, ser una manta profesional a tiempo completo.",
  "published": true,
  "created_at": "2026-03-18T12:07:25.456Z"
},
{
  "id": 2,
  "author_id": 3,
  "title": "Viaje a Bariloche en invierno",
  "content": "Fuimos en julio y fue la mejor decision. La nieve, el chocolate caliente, los lagos congelados... Es otro mundo. El costo fue razonable si reservas con anticipacion. Ya estamos planeando volver.",
  "published": true,
  "created_at": "2026-03-18T12:07:25.456Z"
},
{
  "id": 3,
  "author_id": 3,
  "title": "Recomendacion: Cafe en el centro de Buenos Aires",
  "content": "Descubri un lugar increible en San Telmo. Tienen un flat white espectacular y el ambiente es muy tranquilo para trabajar. Se llama Cafe Baires. Totalmente recomendado!",
  "published": true,
  "created_at": "2026-03-18T12:07:25.456Z"
},
{
  "id": 4,
  "author_id": 2,
  "title": "Receta de tarta de manzana de mi abuela",
  "content": "Esta receta tiene mas de 50 anos en mi familia. Los ingredientes son simples: 3 manzanas, harina, azucar, manteca y canela. El secreto esta en dejar reposar la masa 30 minutos antes de hornear.",
  "published": false,
  "created_at": "2026-03-18T12:07:25.456Z"
},
{
  "id": 5,
  "author_id": 2,
  "title": "Deje mi trabajo corporativo para abrir una panaderia",
  "content": "Despues de 10 anos en una oficina mirando planillas, renuncie, todo para cumplir mi sueno. Los primeros meses fueron un desastre total, queme mas pan del que vendi. Hoy, un ano despues, tengo fila en la puerta cada manana. No me arrepiento de nada.",
  "published": false,
  "created_at": "2026-03-18T12:07:25.456Z"
},
{
  "id": 6,
  "author_id": 1,
  "title": "Pesadilla en la cocina",
  "content": "Segui una receta de 5 minutos y termine con la cocina en llamas, un sensor de humo gritando y una cena que parece carbon activado. Mi unica habilidad culinaria real es tener el numero de la pizzeria guardado en favoritos; al menos ellos no queman el agua.",
  "published": false,
  "created_at": "2026-03-18T12:07:25.456Z"
}
```

### Obtener un post específico

```bash
curl https://proyectom2sambracamonte-production.up.railway.app/api/posts/1
```

**Respuesta:**

```json
{
  "id": 1,
  "author_id": 1,
  "title": "El drama de la alarma",
  "content": "Mi despertador y yo tenemos una relacion toxica: el intenta salvar mi carrera y yo lo golpeo sistematicamente cada cinco minutos. Al final me levanto con la energia de un mapache confundido, preguntandome si mi verdadera vocacion en la vida no es, en realidad, ser una manta profesional a tiempo completo.",
  "published": true,
  "created_at": "2026-03-18T12:07:25.456Z"
}
```

### Obtener posts de un autor específico

```bash
curl https://proyectom2sambracamonte-production.up.railway.app/api/posts/author/1
```

**Respuesta:**

```json
  {
    "id": 1,
    "author_id": 1,
    "title": "El drama de la alarma",
    "content": "Mi despertador y yo tenemos una relacion toxica: el intenta salvar mi carrera y yo lo golpeo sistematicamente cada cinco minutos. Al final me levanto con la energia de un mapache confundido, preguntandome si mi verdadera vocacion en la vida no es, en realidad, ser una manta profesional a tiempo completo.",
    "published": true,
    "created_at": "2026-03-18T12:07:25.456Z"
  },
  {
    "id": 6,
    "author_id": 1,
    "title": "Pesadilla en la cocina",
    "content": "Segui una receta de 5 minutos y termine con la cocina en llamas, un sensor de humo gritando y una cena que parece carbon activado. Mi unica habilidad culinaria real es tener el numero de la pizzeria guardado en favoritos; al menos ellos no queman el agua.",
    "published": false,
    "created_at": "2026-03-18T12:07:25.456Z"
  }
```

### Crear un post

```bash
curl -X POST https://proyectom2sambracamonte-production.up.railway.app/api/posts
  -H "Content-Type: application/json"
  -d '{
    "title": "Introducción a PostgreSQL",
    "content": "PostgreSQL es una base de datos relacional de código abierto...",
    "author_id": 1,
    "published": true
    }'
```

**Respuesta:**

```json
{
  "id": 7,
  "title": "Introducción a PostgreSQL",
  "content": "PostgreSQL es una base de datos relacional de código abierto...",
  "author_id": 1,
  "published": true,
  "created_at": "2026-03-18T16:00:00.000Z"
}
```

### Actualizar un post

```bash
curl -X PUT https://proyectom2sambracamonte-production.up.railway.app/api/posts/7
  -H "Content-Type: application/json"
  -d '{
    "content": "PostgreSQL (PSQL) es una base de datos relacional de código abierto..."
    }'
```

**Respuesta:**

```json
{
  "id": 7,
  "title": "Introducción a POstgreSQL",
  "content": "PostgreSQL (PSQL) es una base de datos relacional de código abierto...",
  "author_id": 1,
  "published": true,
  "created_at": "2026-03-18T16:00:00.000Z"
}
```

### Eliminar un post

```bash
curl -X DELETE https://proyectom2sambracamonte-production.up.railway.app/api/posts/7
```

**Respuesta:**

```json
{
  "message": "Post eliminado exitosamente"
}
```

## Ejecutar Localmente

### Prerrequisitos

- Node.js 20.12.0 o superior
- PostgreSQL 14 o superior

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/Sam0335/ProyectoM2_SamBracamonte.git
cd ProyectoM2_SamBracamonte
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

Crea un archivo `.env` en la raíz del proyecto:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ProyectoM2_SamBracamonte
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
PORT=3000
```

4. Configurar la base de datos:

```bash
# Conectar a PostgreSQL
psql -U tu_usuario

# Crear la base de datos
CREATE DATABASE ProyectoM2_SamBracamonte;

# Ejecutar el script de setup
psql -U tu_usuario -d ProyectoM2_SamBracamonte -f db/setup.sql
```

**!** Para ejecutar los tests:

```bash
npm test
```

5. Iniciar el servidor:

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`.


## Deployment en Railway

1. Crear un nuevo proyecto en Railway, seleccionar database y PostgreSQL.

2. Cargar base de datos manualmente utilizando los archivos `setup.sql` y luego `seed.sql` o en bash utilizar:

```bash
postgresql://postgres:POSTGRES_PASSWORD@public_networking.proxy.rlwy.net:12345/railway

# Modificar el 'POSTGRES_PASSWORD' por su variable
# Modificar 'public_networking.proxy.rlwy.net:12345' por su URL en Setting > Networking > Public Networking
```

**!** Luego cargar los datos de `setup.sql` y luego `seed.sql`

3. Agregar nuevo servicio del GitHub Repository del Proyecto a utilizar.

2. Railway detecta Node.js automaticamente y ejecuta `npm install` y `npm start`.

3. En **Variables** del repositorio agregar:

    - `DATABASE_URL` = (DATABASE_URL de la variable de base de datos)
    - `NODE_ENV` = `production`

4. Desplegar y esperar el build.

**!** Para generar una URL pública, en el GitHub Repository abrir Settings > Networking > Generate Domain

**URLs:**
- **Internal URL**: comunicacion interna entre servicios (no publica).
- **Public URL**: URL publica para navegador o Postman.

## Uso de IA en el proyecto

### Codex fue utilizada para crear la funcion de capturar errores utilizando el errorHandler
![Codex utilizada para crear una función async de manejo de errores:](./img/asyncHandlerResponse.png)

### Codex fue utilizada para dar ideas de validators dentro de la app
![Codex utilizada para dar ideas de validators:](./img/ideasValidatorsResponse.png)

### Codex fue utilizada para generar la estructura base de OpenAPI.yaml
![Codex utilizada para dar estructura base de OpenAPI:](./img/openapiDocumentationResponse1.png)
![Codex utilizada para dar estructura base de OpenAPI:](./img/openapiDocumentationResponse2.png)