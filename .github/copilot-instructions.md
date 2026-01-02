# AI Coding Agent Instructions for blog_api

## Project Overview
This project is a **blog API** built with **TypeScript**. It follows a modular architecture with separate directories for controllers, models, routes, middleware, and utilities. The API integrates with a database (configured in `config/database.ts`) and uses Swagger for API documentation (configured in `config/swagger.ts`).

### Key Components
- **Controllers**: Handle the business logic (e.g., `controllers/authControllers.ts`).
- **Models**: Define the data schema and interact with the database (e.g., `models/Blog.ts`, `models/User.ts`).
- **Routes**: Define API endpoints and link them to controllers (e.g., `routes/authRoutes.ts`).
- **Middleware**: Implement request/response processing logic.
- **Utilities**: Contain helper functions.

### Data Flow
1. **Request**: A client sends a request to an endpoint defined in the `routes`.
2. **Middleware**: The request passes through middleware for validation or preprocessing.
3. **Controller**: The corresponding controller processes the request and interacts with the database via models.
4. **Response**: The controller sends a response back to the client.

## Developer Workflows

### Running the Project
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables in a `.env` file (refer to `dotenv` package).
3. Start the development server:
   ```bash
   ts-node src/index.ts
   ```

### Debugging
- Use `console.log` statements or a debugger to inspect runtime behavior.
- Ensure the `.env` file is correctly configured to avoid runtime errors.

### Building the Project
- Compile TypeScript to JavaScript:
  ```bash
  tsc
  ```

### Testing
- Add tests in a `tests/` directory (not yet implemented).
- Use a testing framework like Jest or Mocha.

## Project-Specific Conventions
- **File Naming**: Use camelCase for file names (e.g., `authRoutes.ts`).
- **Error Handling**: Centralize error handling in middleware.
- **Swagger Documentation**: Update `config/swagger.ts` for API changes.

## Integration Points
- **Database**: Configure the database connection in `config/database.ts`.
- **Environment Variables**: Use the `dotenv` package to manage sensitive data.
- **Swagger**: Access API documentation at `/api-docs` (once the server is running).

## Examples
- **Adding a New Route**:
  1. Create a new route file in `routes/`.
  2. Define the endpoint and link it to a controller.
  3. Import the route in `src/index.ts`.

- **Defining a New Model**:
  1. Create a new file in `models/`.
  2. Define the schema and methods.
  3. Use the model in controllers.

## Key Files
- `src/index.ts`: Entry point of the application.
- `config/database.ts`: Database configuration.
- `config/swagger.ts`: Swagger setup for API documentation.
- `routes/authRoutes.ts`: Example of route definitions.
- `controllers/authControllers.ts`: Example of controller logic.
- `models/User.ts`: Example of a data model.

---

For further assistance, refer to the code comments and structure.