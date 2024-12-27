# Book Lending System API

This is a REST API for managing a book lending system. It provides endpoints to manage books, users, loans, and favorites. Built with Java Spring Boot, it is designed for both administrators and regular users.

## Description

The **Book Lending System API** is a RESTful service that facilitates the management of book lending operations. It is designed to support both regular users and administrators. Regular users can view books, mark favorites, and track loans. Administrators have additional privileges to manage books, users, and loans. The system is built using Java Spring Boot, with PostgreSQL as the database. The frontend is developed using React with Vite.

## Technologies

- **Backend**: Java 17 with Spring Boot
- **Frontend**: React with Vite
- **Build Tool**: Maven
- **Database**: PostgreSQL
- **Documentation**: Swagger
- **Testing**: JUnit
- **Containerization**: Docker with Docker Compose

## Prerequisites

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Java 17**: [Install JDK 17](https://www.azul.com/downloads/?package=jdk#zulu)
- **Maven**: [Install Maven](https://maven.apache.org/download.cgi)
- **Node.js and npm**: [Install Node.js](https://nodejs.org/)

## Setup Instructions

### Backend

1. Clone the repository and navigate to the project folder:
   ```bash
   git clone <repository-url>
   cd emprestimo-livros
   ```

2. Import the project into your preferred IDE.

3. Build the project using Maven:
   ```bash
   mvn clean package
   ```

4. Build and start the Docker containers:
   ```bash
   docker-compose build
   docker-compose up -d
   ```

   This will:
   - Build the backend image
   - Start the PostgreSQL database and backend application

5. The application will be available at:
   - API: `http://localhost:8080`
   - PostgreSQL Database: `localhost:5434`

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd front-emprestimo-livros
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at:
   ```
   http://localhost:5173
   ```

## Database Configuration

- **Database Name**: `emprestimo`
- **Schema**: `emprestimo`
- **Username**: `postgres`
- **Password**: `1996`

### Modifying Credentials

You can modify the database credentials in two places:

1. **Docker Compose File**: Update the environment variables in `docker-compose.yml`:
   ```yaml
   environment:
     POSTGRES_USER: your_username
     POSTGRES_PASSWORD: your_password
     POSTGRES_DB: your_database_name
   ```

2. **Application Configuration**: Update `application.yaml` in the `src/main/resources` directory:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5434/emprestimo
       username: your_username
       password: your_password
   ```

After making changes, rebuild and restart the containers:
```bash
docker-compose down
docker-compose build
docker-compose up -d
```

## How to Stop the Application

To stop the running containers, execute:
```bash
docker-compose down
```

This will stop and remove all containers.

## Endpoints Overview

The API includes the following primary resources:

- **Books**: Endpoints to manage book records.
- **Users**: Endpoints for user management.
- **Loans**: Endpoints to manage book loans.
- **Favorites**: Endpoints to manage user favorites.

> Note: Reservation functionality is not supported.

## Helpful Links

- [How to Install Docker](https://docs.docker.com/get-docker/)
- [How to Install JDK 17 - Linux](https://www.youtube.com/watch?v=iHZ4b1twvlg)
- [How to Install JDK 17 - Windows](https://www.youtube.com/watch?v=QekeJBShCy4)
- [How to Use Docker Compose](https://docs.docker.com/compose/)
- [How to Install Maven - Linux](https://www.youtube.com/watch?v=ieYdISjVy5w)
- [How to install Maven - Windows](https://www.youtube.com/watch?v=-ucX5w8Zm8s)

Feel free to explore and customize the API as needed!

