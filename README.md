# Algorithmic Contest Platform

## About the Project

Algorithmic Contest Platform is a coding platform similar to Codeforces. Users can log in and solve problems from a set of available pools. Additionally, users can participate in coding contests hosted on the platform.

## Features

- User authentication and authorization.

- Problem-solving from a curated pool of challenges.

- Participation in real-time coding contests.

- Judge0 integration for automated code execution and evaluation.

- Dockerized setup for easy deployment and scaling.

## Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS

- **Backend:** Node.js, Next.js, Prisma ORM

- **Database:** PostgreSQL

- **CI/CD:** GitHub Actions (Optional)

- **Containerization:** Docker, Docker Compose

- **Others:** Redis, Judge0 API

## Getting Started

To get a local copy up and running, follow these steps.

### Local Development Setup

#### All Services Within Docker

> **Note:** Do not update any of the `.env` files for this particular configuration, except for the mount path for the problems directory.

1. Update the `##YOUR_LOCAL_PATH_TO_PROBLEMS_DIR##` in the `docker-compose` file.
2. Start the services:
   ```sh
   docker-compose up -d
   ```
3. Install dependencies:
   ```sh
   pnpm install
   ```
4. Copy the `.env` files:
   ```sh
   cp apps/web/.env.example apps/web/.env
   cp packages/db/.env.example packages/db/.env
   ```
5. Update the mount path in `apps/web/.env`.
6. Migrate the database and install the local package:
   ```sh
   pnpm dlx turbo db:migrate && yarn install
   ```
7. Start the development server:
   ```sh
   pnpm dev
   ```

### **Own Configuration**

1. **Configure the `judge0.conf`:**

   - Update the `POSTGRES` and `REDIS` configurations based on your local databases.
   - Update the `##YOUR_LOCAL_PATH_TO_PROBLEMS_DIR##` in the `docker-compose` file.

2. **Start only Judge0 service:**

   ```sh
   docker-compose up server workers -d
   ```

3. **Install dependencies:**

   ```sh
   pnpm install
   ```

4. **Copy `.env` files and configure them with the same configurations you updated in the `judge0.conf`:**

   ```sh
   cp apps/web/.env.example apps/web/.env
   cp packages/db/.env.example packages/db/.env
   ```

5. **Update the mount path in `apps/web/.env`.**

6. **Migrate the database and install the local package:**

   ```sh
   pnpm dlx turbo db:migrate && yarn install
   ```

7. **Start the development server:**
   ```sh
   pnpm dev
   ```

> **Note:** If you use Judge0 in Windows, change the mount path to use `\` instead of `/` for the mounting of `judge0.conf` and the mounting of problems.

## **Usage**

- Visit `http://localhost:3000` after starting the Docker containers.
- Log in or sign up.
- Start solving problems or join ongoing contests.
- View your submission results and rankings in real-time.

## **Docker Setup**

The platform is fully containerized with Docker. To get started:

1. Build and start the Docker containers:

   ```sh
   docker-compose up --build
   ```

2. The platform will be available at `http://localhost:3000`.

## **Contributing**

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have suggestions for improvements, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## **License**

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Darshan Chobarkar - [@dchobarkar](https://www.linkedin.com/in/dchobarkar/) - [@barbatos\_\_08](https://twitter.com/barbatos__08) - contact@darshanwebdev.com

Project Link: [https://github.com/dchobarkar/algorithmic-contest-platform](https://github.com/dchobarkar/algorithmic-contest-platform)
