# README

# Book Lending System

This is a system for managing book lending in a library. It allows the management of books, users, loans, and favorites. Built with **Java Spring Boot** and **React with Vite**, it is designed for both administrators and regular users.

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Platform-Specific Setup](#platform-specific-setup)
- [Database Configuration](#database-configuration)
- [How to Stop the Application](#how-to-stop-the-application)
- [Documentation](#documentation)
- [Helpful Links](#helpful-links)

## Description

The **Book Lending System** facilitates the management of book lending operations. It is designed to support both regular users and administrators. Regular users can view books, mark favorites, and track their loans. Administrators have additional privileges to manage books, users, and loans. The system is built with Java Spring Boot and uses PostgreSQL as the database. The frontend is developed using React with Vite

## Technologies

- **Backend**: Java 17 with Spring Boot 
- **Frontend**: React with Vite 
- **Build Tool**: Maven
- **Database**: PostgreSQL 
- **Documentation**: Swagger 
- **Containerization**: Docker with Docker Compose

![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Apache Maven](https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=Apache%20Maven&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

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
    git clone <repository-url>cd emprestimo-livros
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
    - Follow the links in the [Prerequisites](about:blank#prerequisites) section for installation guides.
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
    
5. Repeat the frontend setup instructions from the [Frontend Setup](about:blank#frontend-setup) section.

### Ubuntu

1. Install the necessary dependencies using the package manager:
    
    ```bash
    sudo apt update
    sudo apt install openjdk-17-jdk maven nodejs npm docker.io docker-compose
    ```
    
2. Clone the repository and navigate to the backend folder:
    
    ```bash
    git clone <repository-url>cd emprestimo-livros
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
    
5. Repeat the frontend setup instructions from the [Frontend Setup](about:blank#frontend-setup) section.

### Mac

1. Install the necessary tools:
    - Use **Homebrew** to install dependencies:
        
        ```bash
        brew install openjdk@17 maven node docker docker-compose
        ```
        
2. Clone the repository and navigate to the backend folder:
    
    ```bash
    git clone <repository-url>cd emprestimo-livros
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
    
5. Repeat the frontend setup instructions from the [Frontend Setup](about:blank#frontend-setup) section.

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
    CREATE DATABASE emprestimo_livros;
    ```
    
5. Create the schema and user:
    
    ```sql
    CREATE SCHEMA emprestimo;
    ```
    

### Modifying Credentials

You can modify the database credentials in two places:

1. **Docker Compose File**: Update the environment variables in `docker-compose.yml`:
    
    ```yaml
    environment:  POSTGRES_USER: your_username  POSTGRES_PASSWORD: your_password  POSTGRES_DB: your_database_name
    ```
    
2. **Application Configuration**: Update `application.yaml` in the `src/main/resources` directory:
    
    ```yaml
    spring:  datasource:    url: jdbc:postgresql://localhost:5434/emprestimo    username: your_username    password: your_password
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

## Documentation

### Table of Contents

- [Requirements](#requirements)
- [Use Case Diagram](#use-case-diagram)
- [Class Diagram](#class-diagram)
- [Entity-Relationship Diagram](#entity-relationship-diagram)
- [Database Table Descriptions](#database-table-descriptions)
- [Endpoints Overview](#endpoints-overview)

### Requirements

**Functional Requirements:**

- The system will have two types of users: regular users and administrators.
- Users must be able to view the list of available books.
- Users must be able to search for books by title, author, and genre, and filter by available, unavailable, and favorites.
- Users must be able to favorite and unfavorite books and view them in a list.
- Users must be able to view their loan history.
- It must be possible to filter the loan history by borrowed and returned books.
- Administrators can create, edit, and delete books.
- Administrators can search for loans by book, user, or email.
- Administrators can create loans, renew them, and mark them as returned.
- Administrators can view a list of users and search by name or email.
- Administrators can create, edit, and delete users.

**Bussiness Rules:**

- A user can renew a loan up to 2 times.
- It is not possible to renew before the loan's due date.
- A user is prevented from borrowing books if they have returned one late; the "blocked" status is proportional to the delay in returning the book.
- The library decreases the quantity of the borrowed book by one.
- If all copies of a book have been borrowed, the book becomes unavailable.

### Use Case Diagram

![Diagrama de caso de uso (2)](/readme-files/Diagrama%20de%20caso%20de%20uso%20(2).png)

### Class Diagram

![DiagramaDeClassesDevWebAvancado.drawio.png](/readme-files/DiagramaDeClassesDevWebAvancado.drawio.png)

### Entity-Relationship Diagram

![ERDevWeb.drawio (3)](/readme-files/ERDevWeb.drawio%20(3).png)

### Database Table Descriptions

**tb_user:**

| **sq_user** | User identifier: BigInt |
| --- | --- |
| nome | User name: varchar(255) |
| email | User email: varchar(255) |
| senha | User password: varchar(255) |
| role | User role (user or admin): varchar(255) |
| blocked_until | Date until which the user is blocked from making loans: Timestamp |

**tb_loan:**

| **sq_loan** | Loan identifier: BigInt |
| --- | --- |
| data_devolucao | Return date: Timestamp |
| data_emprestimo | Loan date: Timestamp |
| status | Loan Status(emprestado, devolvido): Varchar(255) |
| livro_id | Book identifier : BigInt |
| usuario_id | User identifier: BigInt |
| renovacoes | Number of renewals: Int |

**tb_book:**

| **sq_book** | Book identifier: BigInt |
| --- | --- |
| autor | Book author: Varchar(255) |
| data_publicação | Publication date: Date |
| disponivel | Flag for availability: Boolean |
| isbn | Book ISBN: Varchar(255) |
| titulo | Title: Varchar(255) |
| quantidade_exemplares | Number of copies: Int |
| genero | Genre: Varchar(20) |

**tb_favorite:**

| **sq_favorite** | Favorite identifier: BigInt |
| --- | --- |
| livro_id | Book identifier: BigInt |
| usuario_id | User identifier: BigInt |

### Endpoints Overview

The API includes the following primary resources:

- **Books**: Endpoints to manage book records.
    - ![PUT](https://img.shields.io/badge/PUT-yellow): /books/update - Update Book.
    - ![POST](https://img.shields.io/badge/POST-green): /books/title - Search book by title.
    - ![POST](https://img.shields.io/badge/POST-green): /books/save - Create book.
    - ![GET](https://img.shields.io/badge/GET-blue): /books - Get all books
    - ![GET](https://img.shields.io/badge/GET-blue): /books/{id} - Get book by ID.
    - ![DELETE](https://img.shields.io/badge/DELETE-red): /books/delete - Delete book.
- **Users**: Endpoints for user management.
    - ![POST](https://img.shields.io/badge/POST-green): /users/update - Update user.
    - ![GET](https://img.shields.io/badge/GET-blue): /users/ - Get all users.
    - ![GET](https://img.shields.io/badge/GET-blue): /users/{id} - Get user by ID.
    - ![DELETE](https://img.shields.io/badge/DELETE-red): /users/{id} - Delete user by ID.
    - ![GET](https://img.shields.io/badge/GET-blue): /users/email/{email} - Get user by email.
- **Loans**: Endpoints to manage book loans.
    - ![PUT](https://img.shields.io/badge/PUT-yellow): /loans/update - Update Loan.
    - ![PUT](https://img.shields.io/badge/PUT-yellow): /loans/return/{loanId} - Mark loan as returned.
    - ![PUT](https://img.shields.io/badge/PUT-yellow): /loans/renew/{loanI} - Renew loan for 7 more days.
    - ![POST](https://img.shields.io/badge/POST-green): /loans/search-by-user- Search loan by user.
    - ![POST](https://img.shields.io/badge/POST-green): /loans/search-by-book - Search loan by book.
    - ![POST](https://img.shields.io/badge/POST-green): /loans/create - Create a loan.
    - ![GET](https://img.shields.io/badge/GET-blue): /loans - Get all loans.
    - ![GET](https://img.shields.io/badge/GET-blue): /loans/loan-by-user/{userId} - Get loans by user ID.
- **Favorites**: Endpoints to manage user favorites.
    - ![POST](https://img.shields.io/badge/POST-green): /favorites/add - Create favorite.
    - ![GET](https://img.shields.io/badge/GET-blue): /favorites/ - Get all favorites.
    - ![GET](https://img.shields.io/badge/GET-blue): /favorites/usuario/{usuarioId} - Get favorite by ID.
    - ![DELETE](https://img.shields.io/badge/DELETE-red): /favorites/delete/favorite/{idUsuario}/{idLivro} - Delete favorite.
- **Authentication**: Endpoints for user authentication.
    - ![POST](https://img.shields.io/badge/POST-green): /auth/register - Create user.
    - ![POST](https://img.shields.io/badge/POST-green): /auth/login - Log in and receive JWT token.
    - ![POST](https://img.shields.io/badge/POST-green): /auth/google-login - Log in with google and receive JWT token.
    - ![GET](https://img.shields.io/badge/GET-blue): /auth/usuario/logado - Return information of the logged-in user.

> Note: Reservation functionality is not supported.
> 

## Helpful Links

- [How to Install Docker](https://docs.docker.com/get-docker/)
- [How to Install JDK 17 - Linux](https://www.youtube.com/watch?v=iHZ4b1twvlg)
- [How to Install JDK 17 - Windows](https://www.youtube.com/watch?v=QekeJBShCy4)
- [How to Use Docker Compose](https://docs.docker.com/compose/)
- [How to Install Maven - Linux](https://www.youtube.com/watch?v=ieYdISjVy5w)
- [How to Install Maven - Windows](https://www.youtube.com/watch?v=-ucX5w8Zm8s)

Feel free to explore and customize the system as needed!
