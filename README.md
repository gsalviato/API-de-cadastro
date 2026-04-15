# Native Node.js Customer Management API

A robust, framework-less RESTful API for customer management built as a high-level software engineering exercise. The primary challenge was to architect a maintainable and scalable application using **only Node.js native modules** (like `http`), avoiding common frameworks like Express or Fastify.

## 🎯 Project Goals & Constraints

- **Zero Frameworks:** Built using vanilla Node.js.
- **Strict TypeScript:** High type safety and interface-driven design.
- **Architectural Excellence:** Following SOLID principles and Clean Code.
- **Object Calisthenics Compliance:**
    - Only one level of indentation per method.
    - No `else` keyword (Early Return pattern).
    - Wrapped primitives (Value Objects).
- **Relational Integrity:** SQLite implementation respecting the 3rd Normal Form (3NF).

## 🛠 Tech Stack

- **Runtime:** Node.js (Native `http` module)
- **Language:** TypeScript
- **Database:** SQLite (via `sqlite3` and `sqlite` wrapper)
- **Development Tooling:** `ts-node` for execution, `tsc` for compilation.

## 📂 Project Structure

```text
src/
├── domain/            # Business logic, Entities, and Value Objects
├── infrastructure/    # Database connection, Repositories, and HTTP Helpers
├── controllers/       # Orchestration and request handling
└── server.ts          # Entry point and native routing logic