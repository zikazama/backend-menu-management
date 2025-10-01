# API Documentation

## Base URL
```
http://localhost:3000
```

---

## Tree API

### 1. Create Tree
Create a new tree structure.

**Endpoint:** `POST /trees`

**Request Body:**
```json
{
  "treeId": "custom-tree-id",  // optional, auto-generated if not provided
  "treeName": "Main Navigation" // required
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "treeId": "custom-tree-id",
  "treeName": "Main Navigation",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

---

### 2. Get All Trees
Get all trees with menu count.

**Endpoint:** `GET /trees`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "treeId": "4cd35d41-35c7-44fc-95d9-aec3a34e9766",
    "treeName": "System Management",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "_count": {
      "menus": 19
    }
  }
]
```

---

### 3. Get Tree by ID
Get a specific tree with all its menus.

**Endpoint:** `GET /trees/:id`

**Params:**
- `id` (number): Tree ID

**Response:** `200 OK`
```json
{
  "id": 1,
  "treeId": "4cd35d41-35c7-44fc-95d9-aec3a34e9766",
  "treeName": "System Management",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "menus": [
    {
      "id": 1,
      "uuid": "uuid-1",
      "treeId": "4cd35d41-35c7-44fc-95d9-aec3a34e9766",
      "depth": 0,
      "name": "System Management",
      "parentId": null,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 4. Get Tree by TreeId
Get a specific tree by its treeId.

**Endpoint:** `GET /trees/treeId/:treeId`

**Params:**
- `treeId` (string): Tree UUID

**Response:** `200 OK`
```json
{
  "id": 1,
  "treeId": "4cd35d41-35c7-44fc-95d9-aec3a34e9766",
  "treeName": "System Management",
  "menus": [...]
}
```

---

### 5. Update Tree
Update tree name.

**Endpoint:** `PATCH /trees/:id`

**Params:**
- `id` (number): Tree ID

**Request Body:**
```json
{
  "treeName": "Updated Tree Name" // optional
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "treeId": "4cd35d41-35c7-44fc-95d9-aec3a34e9766",
  "treeName": "Updated Tree Name",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

---

### 6. Delete Tree
Delete a tree and all its menus (cascade delete).

**Endpoint:** `DELETE /trees/:id`

**Params:**
- `id` (number): Tree ID

**Response:** `204 No Content`

---

## Menu API

### 1. Create Single Menu Item
Create a single menu item.

**Endpoint:** `POST /menus`

**Request Body:**
```json
{
  "name": "Dashboard",           // required
  "treeId": "tree-uuid",         // optional, must exist in trees table
  "depth": 0,                    // optional, default: 0, min: 0
  "parentId": 1                  // optional, must be valid menu ID
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "uuid": "uuid-1",
  "treeId": "tree-uuid",
  "depth": 0,
  "name": "Dashboard",
  "parentId": null,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

**Notes:**
- If `parentId` is provided, the menu will inherit the parent's `treeId`
- If `treeId` is provided, it must exist in the `trees` table

---

### 2. Create Tree Menu
Create a complete menu tree structure in a single request.

**Endpoint:** `POST /menus/tree`

**Request Body:**
```json
{
  "treeId": "tree-uuid",         // optional, must exist in trees table
  "name": "Main Menu",           // required
  "children": [                  // optional
    {
      "name": "Products",
      "children": [
        {
          "name": "Electronics"
        },
        {
          "name": "Clothing"
        }
      ]
    },
    {
      "name": "Services"
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "uuid": "uuid-1",
  "treeId": "tree-uuid",
  "depth": 0,
  "name": "Main Menu",
  "parentId": null,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "children": [
    {
      "id": 2,
      "uuid": "uuid-2",
      "treeId": "tree-uuid",
      "depth": 1,
      "name": "Products",
      "parentId": 1,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z",
      "children": [...]
    }
  ]
}
```

**Notes:**
- Automatically calculates `depth` based on nesting level
- All menus in the tree will have the same `treeId`

---

### 3. Get All Menus (Flat List)
Get all menus as a flat list ordered by depth and id.

**Endpoint:** `GET /menus`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "uuid": "uuid-1",
    "treeId": "tree-uuid",
    "depth": 0,
    "name": "System Management",
    "parentId": null,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

### 4. Get All Trees (Grouped by TreeId)
Get all menus grouped by treeId as tree structures.

**Endpoint:** `GET /menus/trees`

**Response:** `200 OK`
```json
[
  {
    "treeId": "4cd35d41-35c7-44fc-95d9-aec3a34e9766",
    "menus": [
      {
        "id": 1,
        "uuid": "uuid-1",
        "treeId": "4cd35d41-35c7-44fc-95d9-aec3a34e9766",
        "depth": 0,
        "name": "System Management",
        "parentId": null,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z",
        "children": [...]
      }
    ]
  }
]
```

---

### 5. Get Menu Tree by TreeId
Get menus for a specific tree as a tree structure.

**Endpoint:** `GET /menus/tree/:treeId`

**Params:**
- `treeId` (string): Tree UUID

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "uuid": "uuid-1",
    "treeId": "tree-uuid",
    "depth": 0,
    "name": "System Management",
    "parentId": null,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "children": [
      {
        "id": 2,
        "uuid": "uuid-2",
        "treeId": "tree-uuid",
        "depth": 1,
        "name": "Systems",
        "parentId": 1,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-01T00:00:00.000Z",
        "children": [...]
      }
    ]
  }
]
```

---

### 6. Get All Menu Tree
Get all menus as a tree structure (without filtering by treeId).

**Endpoint:** `GET /menus/tree`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "uuid": "uuid-1",
    "treeId": "tree-uuid-1",
    "depth": 0,
    "name": "System Management",
    "parentId": null,
    "children": [...]
  },
  {
    "id": 20,
    "uuid": "uuid-20",
    "treeId": "tree-uuid-2",
    "depth": 0,
    "name": "Main Navigation",
    "parentId": null,
    "children": [...]
  }
]
```

---

### 7. Get Menu by ID
Get a specific menu by its ID with parent and children.

**Endpoint:** `GET /menus/:id`

**Params:**
- `id` (number): Menu ID

**Response:** `200 OK`
```json
{
  "id": 1,
  "uuid": "uuid-1",
  "treeId": "tree-uuid",
  "depth": 0,
  "name": "System Management",
  "parentId": null,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "parent": null,
  "children": [
    {
      "id": 2,
      "uuid": "uuid-2",
      "treeId": "tree-uuid",
      "depth": 1,
      "name": "Systems",
      "parentId": 1,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 8. Get Menu by UUID
Get a specific menu by its UUID with parent and children.

**Endpoint:** `GET /menus/uuid/:uuid`

**Params:**
- `uuid` (string): Menu UUID

**Response:** `200 OK`
```json
{
  "id": 1,
  "uuid": "uuid-1",
  "treeId": "tree-uuid",
  "depth": 0,
  "name": "System Management",
  "parentId": null,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "parent": null,
  "children": [...]
}
```

---

### 9. Update Menu
Update a menu item.

**Endpoint:** `PATCH /menus/:id`

**Params:**
- `id` (number): Menu ID

**Request Body:**
```json
{
  "name": "Updated Name",        // optional
  "depth": 1,                    // optional, min: 0
  "parentId": 2                  // optional, cannot be same as menu id
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "uuid": "uuid-1",
  "treeId": "tree-uuid",
  "depth": 1,
  "name": "Updated Name",
  "parentId": 2,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

**Notes:**
- A menu cannot be its own parent
- If `parentId` is provided, it must exist

---

### 10. Delete Menu
Delete a menu and all its children (cascade delete).

**Endpoint:** `DELETE /menus/:id`

**Params:**
- `id` (number): Menu ID

**Response:** `204 No Content`

---

## Error Responses

### 400 Bad Request
Invalid request data or validation errors.

```json
{
  "statusCode": 400,
  "message": ["name should not be empty"],
  "error": "Bad Request"
}
```

### 404 Not Found
Resource not found.

```json
{
  "statusCode": 404,
  "message": "Menu with ID 999 not found",
  "error": "Not Found"
}
```

### 409 Conflict
Conflict with existing data.

```json
{
  "statusCode": 409,
  "message": "Tree with ID custom-id already exists",
  "error": "Conflict"
}
```

### 500 Internal Server Error
Server error.

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## Database Schema

### Tree Model
```prisma
model Tree {
  id        Int      @id @default(autoincrement())
  treeId    String   @unique @default(uuid())
  treeName  String
  menus     Menu[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Menu Model
```prisma
model Menu {
  id        Int      @id @default(autoincrement())
  uuid      String   @unique @default(uuid())
  treeId    String?
  tree      Tree?    @relation(fields: [treeId], references: [treeId], onDelete: Cascade)
  depth     Int      @default(0)
  name      String
  parentId  Int?
  parent    Menu?    @relation("MenuToMenu", fields: [parentId], references: [id], onDelete: Cascade)
  children  Menu[]   @relation("MenuToMenu")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Seed Data

Run the following command to populate the database with sample data:

```bash
npm run prisma:seed
```

This will create:
1. **System Management** tree with 19 menus
2. **Main Navigation** tree with 4 menus
3. **Footer Navigation** tree with 3 menus

---

## Development Commands

```bash
# Start development server
npm run start:dev

# Build project
npm run build

# Start production server
npm run start:prod

# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio

# Run seed
npm run prisma:seed
```
