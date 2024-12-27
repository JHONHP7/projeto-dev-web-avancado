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

### Backend Setup

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

5. Access the application:
   - API: `http://localhost:8080`
   - PostgreSQL Database: `localhost:5434`

### Frontend Setup

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

## Platform-Specific Setup

### Windows

1. Ensure that **Docker Desktop**, **JDK 17**, **Maven**, and **Node.js** are installed and added to the system PATH.
   - Follow the links in the [Prerequisites](#prerequisites) section for installation guides.

2. Open a terminal (PowerShell or Command Prompt) and navigate to the backend folder.
   ```bash
   cd emprestimo-livros
   ```

3. Build the backend project:
   ```bash
   mvn clean package
   ```

4. Start the containers:
   ```bash
   docker-compose build
   docker-compose up -d
   ```

5. Repeat the frontend setup instructions from the [Frontend Setup](#frontend-setup) section.

### Ubuntu

1. Install the necessary dependencies using the package manager:
   ```bash
   sudo apt update
   sudo apt install openjdk-17-jdk maven nodejs npm docker.io docker-compose
   ```

2. Clone the repository and navigate to the backend folder:
   ```bash
   git clone <repository-url>
   cd emprestimo-livros
   ```

3. Build the backend project:
   ```bash
   mvn clean package
   ```

4. Start the containers:
   ```bash
   sudo docker-compose build
   sudo docker-compose up -d
   ```

5. Repeat the frontend setup instructions from the [Frontend Setup](#frontend-setup) section.

### Mac

1. Install the necessary tools:
   - Use **Homebrew** to install dependencies:
     ```bash
     brew install openjdk@17 maven node docker docker-compose
     ```

2. Clone the repository and navigate to the backend folder:
   ```bash
   git clone <repository-url>
   cd emprestimo-livros
   ```

3. Build the backend project:
   ```bash
   mvn clean package
   ```

4. Start the containers:
   ```bash
   docker-compose build
   docker-compose up -d
   ```

5. Repeat the frontend setup instructions from the [Frontend Setup](#frontend-setup) section.

## Database Configuration

- **Database Name**: `emprestimo`
- **Schema**: `emprestimo`
- **Username**: `postgres`
- **Password**: `1996`

### Creating the Database Locally

If you want to create and configure the database manually without Docker, follow these steps:

1. Install PostgreSQL:
   - **Windows**: Download and install PostgreSQL from [PostgreSQL Downloads](https://www.postgresql.org/download/).
   - **Ubuntu**:
     ```bash
     sudo apt update
     sudo apt install postgresql postgresql-contrib
     ```
   - **Mac**: Use Homebrew:
     ```bash
     brew install postgresql
     ```

2. Start the PostgreSQL service:
   - **Windows**: Start the service via the PostgreSQL app or `pgAdmin`.
   - **Ubuntu**:
     ```bash
     sudo systemctl start postgresql
     ```
   - **Mac**:
     ```bash
     brew services start postgresql
     ```

3. Log in to the PostgreSQL shell:
   ```bash
   psql -U postgres
   ```
   - Enter the password if prompted.

4. Create the database:
   ```sql
   CREATE DATABASE emprestimo;
   ```

5. Create the schema and user:
   ```sql
   CREATE SCHEMA emprestimo;
   CREATE USER emprestimo_user WITH PASSWORD '1996';
   GRANT ALL PRIVILEGES ON DATABASE emprestimo TO emprestimo_user;
   ALTER SCHEMA emprestimo OWNER TO emprestimo_user;
   ```

6. Update your `application.yaml` file to reflect the new database settings:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/emprestimo
       username: emprestimo_user
       password: 1996
   ```

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
- [How to Install Maven - Windows](https://www.youtube.com/watch?v=-ucX5w8Zm8s)

Feel free to explore and customize the API as needed!

