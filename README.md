# Backend Menu Management

A NestJS-based REST API for managing hierarchical menu structures with multiple independent tree support, using PostgreSQL and Prisma ORM.

## Features

- ✅ **Multiple Tree Support** - Manage multiple independent menu tree structures
- ✅ **Tree Management** - Full CRUD operations for tree structures
- ✅ **Menu Management** - Complete menu lifecycle management
- ✅ **Hierarchical Structure** - Parent-child relationships with unlimited depth
- ✅ **Tree Builder** - Create entire tree structures in a single request
- ✅ **UUID Support** - Unique identifiers for both trees and menus
- ✅ **Depth Tracking** - Automatic depth calculation for menu levels
- ✅ **Input Validation** - class-validator for data integrity
- ✅ **PostgreSQL + Prisma** - Type-safe database operations
- ✅ **Seed Data** - Pre-populated with 3 sample tree structures

## Tech Stack

- **Framework**: NestJS 10.x
- **Database**: PostgreSQL (Neon DB)
- **ORM**: Prisma 6.x
- **Validation**: class-validator & class-transformer
- **Language**: TypeScript
- **Node**: 18.x or higher

## Project Structure

```
backend-menu-management/
├── src/
│   ├── common/
│   │   └── prisma/              # Global Prisma module & service
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   ├── modules/
│   │   ├── menu/                # Menu feature module
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── create-menu.dto.ts
│   │   │   │   ├── create-menu-tree.dto.ts
│   │   │   │   └── update-menu.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── menu.entity.ts
│   │   │   ├── menu.controller.ts
│   │   │   ├── menu.service.ts
│   │   │   └── menu.module.ts
│   │   └── tree/                # Tree feature module
│   │       ├── dto/
│   │       │   ├── create-tree.dto.ts
│   │       │   └── update-tree.dto.ts
│   │       ├── entities/
│   │       │   └── tree.entity.ts
│   │       ├── tree.controller.ts
│   │       ├── tree.service.ts
│   │       └── tree.module.ts
│   ├── app.module.ts            # Root application module
│   └── main.ts                  # Application entry point
├── prisma/
│   ├── schema.prisma            # Prisma schema definition
│   ├── seed.ts                  # Database seeder
│   └── migrations/              # Database migrations
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── api-doc.md                   # API documentation
├── docker-compose.yml           # Docker PostgreSQL setup (optional)
└── package.json
```

## Database Schema

### Tree Table

| Column    | Type     | Description                        |
|-----------|----------|------------------------------------|
| id        | Int      | Primary key (auto-increment)       |
| treeId    | String   | Unique identifier (UUID)           |
| treeName  | String   | Tree display name                  |
| createdAt | DateTime | Creation timestamp                 |
| updatedAt | DateTime | Last update timestamp              |

### Menu Table

| Column    | Type     | Description                           |
|-----------|----------|---------------------------------------|
| id        | Int      | Primary key (auto-increment)          |
| uuid      | String   | Unique identifier (auto-generated)    |
| treeId    | String?  | Foreign key to tree (nullable)        |
| depth     | Int      | Menu level depth (0 = root)           |
| name      | String   | Menu display name                     |
| parentId  | Int?     | Foreign key to parent menu (nullable) |
| createdAt | DateTime | Creation timestamp                    |
| updatedAt | DateTime | Last update timestamp                 |

**Relationships:**
- **Tree → Menu**: One-to-many (one tree has many menus)
- **Menu → Menu**: Self-referencing (parent ↔ children)
- **Cascade Delete**:
  - Deleting a tree deletes all its menus
  - Deleting a parent menu deletes all children

## Installation

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Neon DB account)

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your database credentials:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
   PORT=3000
   ```

3. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

4. **Run database migration**
   ```bash
   npm run prisma:migrate
   ```

5. **Seed the database** (optional but recommended)
   ```bash
   npm run prisma:seed
   ```

6. **Start the application**

   Development mode:
   ```bash
   npm run start:dev
   ```

   Production mode:
   ```bash
   npm run build
   npm run start:prod
   ```

## API Endpoints

**Production URL**: https://backend-menu-management.vercel.app

**Local Development**: `http://localhost:3000`

For complete API documentation, see [api-doc.md](./api-doc.md)

### Quick Reference

#### Tree Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/trees` | Create a new tree |
| GET | `/trees` | Get all trees with menu count |
| GET | `/trees/:id` | Get tree by ID with all menus |
| GET | `/trees/treeId/:treeId` | Get tree by treeId with all menus |
| PATCH | `/trees/:id` | Update tree name |
| DELETE | `/trees/:id` | Delete tree and all its menus |

#### Menu Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/menus` | Create a single menu item |
| POST | `/menus/tree` | Create entire tree structure |
| GET | `/menus` | Get all menus (flat list) |
| GET | `/menus/trees` | Get all menus grouped by tree |
| GET | `/menus/tree/:treeId` | Get tree structure by treeId |
| GET | `/menus/tree` | Get all menus as tree |
| GET | `/menus/:id` | Get menu by ID |
| GET | `/menus/uuid/:uuid` | Get menu by UUID |
| PATCH | `/menus/:id` | Update menu |
| DELETE | `/menus/:id` | Delete menu and children |

### Example Usage

#### Create a Tree
```bash
curl -X POST http://localhost:3000/trees \
  -H "Content-Type: application/json" \
  -d '{
    "treeName": "Admin Dashboard"
  }'
```

#### Create Menu Tree Structure
```bash
curl -X POST http://localhost:3000/menus/tree \
  -H "Content-Type: application/json" \
  -d '{
    "treeId": "your-tree-id",
    "name": "Dashboard",
    "children": [
      {
        "name": "Users",
        "children": [
          {"name": "User List"},
          {"name": "User Roles"}
        ]
      }
    ]
  }'
```

#### Get All Trees
```bash
curl http://localhost:3000/trees
```

#### Get Menu Tree
```bash
curl http://localhost:3000/menus/tree/your-tree-id
```

## Validation Rules

### Tree DTOs

**CreateTreeDto:**
- `treeId` (optional): string - Custom tree ID (auto-generated if not provided)
- `treeName` (required): string - Display name for the tree

**UpdateTreeDto:**
- `treeName` (optional): string - Updated display name

### Menu DTOs

**CreateMenuDto:**
- `name` (required): string
- `treeId` (optional): string - Must exist in trees table
- `depth` (optional): integer ≥ 0 (default: 0)
- `parentId` (optional): integer - Must be valid menu ID

**CreateMenuTreeDto:**
- `treeId` (optional): string - Must exist in trees table
- `name` (required): string
- `children` (optional): array of menu nodes

**UpdateMenuDto:**
- `name` (optional): string
- `depth` (optional): integer ≥ 0
- `parentId` (optional): integer

### Business Rules

**Tree:**
- Tree ID must be unique if provided
- Deleting a tree cascades to all its menus

**Menu:**
- Menu cannot be its own parent
- Parent menu must exist if `parentId` is provided
- Tree must exist if `treeId` is provided
- If menu has parent, inherits parent's `treeId`
- Deleting a parent menu cascades to all descendants

## Database Seeder

The seeder populates the database with 3 independent tree structures:

### Tree 1: System Management (19 menus)
```
System Management
├── Systems
│   ├── System Code
│   │   ├── Code Registration
│   │   └── Code Registration - 2
│   ├── Properties
│   ├── Menus
│   │   └── Menu Registration
│   └── API List
│       ├── API Registration
│       └── API Edit
└── Users & Groups
    ├── Users
    │   └── User Account Registration
    ├── Groups
    │   └── User Group Registration
    └── 사용자 승인
        └── 사용자 승인 상세
```

### Tree 2: Main Navigation (4 menus)
```
Home
Products
├── Electronics
└── Clothing
```

### Tree 3: Footer Navigation (3 menus)
```
Company
├── About Us
└── Contact
```

### Run the Seeder

⚠️ **Warning**: This will delete all existing data!

```bash
npm run prisma:seed
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the application |
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode with hot reload |
| `npm run start:prod` | Start in production mode |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |
| `npm run prisma:seed` | Seed the database |

## Docker Setup (Optional)

If you prefer to run PostgreSQL locally with Docker:

```bash
docker-compose up -d
```

This will start a PostgreSQL container on port 5432. Update your `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/menu_management?schema=public"
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET/PATCH requests
- `201 Created` - Successful POST requests
- `204 No Content` - Successful DELETE requests
- `400 Bad Request` - Validation errors
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resources
- `500 Internal Server Error` - Server errors

**Example error responses**:

**404 Not Found:**
```json
{
  "statusCode": 404,
  "message": "Tree with treeId abc-123 not found",
  "error": "Not Found"
}
```

**409 Conflict:**
```json
{
  "statusCode": 409,
  "message": "Tree with ID custom-id already exists",
  "error": "Conflict"
}
```

**400 Bad Request:**
```json
{
  "statusCode": 400,
  "message": ["treeName should not be empty"],
  "error": "Bad Request"
}
```

## Development

### Adding New Features

1. Create new module:
   ```bash
   npx nest generate module modules/feature-name
   ```

2. Generate controller and service:
   ```bash
   npx nest generate controller modules/feature-name
   npx nest generate service modules/feature-name
   ```

### Database Changes

1. Update `prisma/schema.prisma`
2. Create migration:
   ```bash
   npx prisma migrate dev --name migration_name
   ```
3. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

## Testing

### Manual Testing with curl

**Create a tree:**
```bash
curl -X POST http://localhost:3000/trees \
  -H "Content-Type: application/json" \
  -d '{"treeName": "Test Navigation"}'
```

**Get all trees:**
```bash
curl http://localhost:3000/trees
```

**Create a menu:**
```bash
curl -X POST http://localhost:3000/menus \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Menu", "treeId": "your-tree-id"}'
```

**Create a tree structure:**
```bash
curl -X POST http://localhost:3000/menus/tree \
  -H "Content-Type: application/json" \
  -d '{
    "treeId": "your-tree-id",
    "name": "Dashboard",
    "children": [
      {"name": "Settings"},
      {"name": "Profile"}
    ]
  }'
```

**Get menu tree:**
```bash
curl http://localhost:3000/menus/tree/your-tree-id
```

## Troubleshooting

### Database Connection Issues

1. Verify DATABASE_URL in `.env`
2. Check database server is running
3. Ensure network connectivity to database host

### Prisma Client Not Generated

Run:
```bash
npm run prisma:generate
```

### Migration Failures

Reset database (⚠️ deletes all data):
```bash
npx prisma migrate reset
```

## License

ISC

## Author

Backend Menu Management Team
# backend-menu-management
