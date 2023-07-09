## CashFluence
This repository was created for participating in the Questrade hackathon. It includes user management and authentication features.

### description
The project implements parameter validation for all endpoints, environment variable validation, and authentication guard for all routes except the login and user creation routes. The platform used for development is Express.js. The database connection is established using TypeORM.

## Installation
To install and run the project locally, follow these steps:
1. Clone the repository:
```bash
git clone <repository_url>
```

2. Install the dependencies:
```bash

yarn

```

3. Set up the environment variables. Create a `.env` file in the root directory of the project and provide the necessary variables. Example:

```makefile
	# GENERAL
  PORT=3000
  JWT_SECRET=yoursecret

  # DATABASE
  DATABASE_USER=username
  DATABASE_PASSWORD=password
  DATABASE_NAME=dbname
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
```

- Start the application:
```bash
yarn start
```

  
## Usage
Once the application is running, you can access the endpoints using a tool like Postman or any other API testing tool. Below are the available endpoints:
- `POST /user`: Create a new user (registration).
- `POST /login`: Authenticate a user and generate an access token.
- `GET /users/me`: Get user information.

## Technologies Used
The project utilizes the following technologies:
- Express.js: A fast and minimalist web application framework for Node.js.
- TypeORM: An Object-Relational Mapping (ORM) library for TypeScript and JavaScript.
- Nest.js: A module for building efficient and scalable Node.js applications.
- asdf: A version management tool that allows managing multiple runtime versions on a per-project basis.