# ECommerce App with Remix

An advanced eCommerce platform built using [Remix](https://remix.run/) that delivers a seamless shopping experience with modern web development best practices. This application features a robust architecture, efficient data handling, and a smooth checkout process.

## Features

- **User Authentication**: Sign-up, login, and logout functionality.
- **Product Catalog**: Browse products with categories and filters.
- **Shopping Cart & Checkout**: Add items to cart and complete purchases.
- **SEO & Performance**: Server-side rendering (SSR) for optimal performance and search engine visibility.
- **Fully Responsive**: Optimized for both mobile and desktop experiences.
- **Secure Payments**: Integrated with **eSewa** for seamless transactions.
- **Continuous Deployment**: Automated CI/CD pipeline for efficient development and deployment.

## Tech Stack

- **Framework**: [Remix](https://remix.run/)
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Remix Loaders/Actions
- **Database**: PostgreSQL (via Prisma)
- **Containerization**: Docker
- **Web Server**: Nginx
- **Deployment**: AWS EC2 with CI/CD
- **HTTPS**: Configured using DuckDNS

## Installation

### Clone the Repository

```bash
git clone https://github.com/sup25/remix.git
cd remix
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```bash
DATABASE_URL=your_database_url
```

### Run Database Migrations (if using Prisma)

```bash
npx prisma migrate dev
```

### Start the Development Server

```bash
npm run dev
```

### Open the App in Your Browser

```bash
http://localhost:5173
```

## Deployment

### CI/CD Pipeline

This project follows a CI/CD workflow using GitHub Actions to build, push, and deploy the application to an AWS EC2 instance using Docker and Nginx.

#### CI/CD Workflow:

1. **Trigger**: Runs on push or pull request to the `main` branch.
2. **Build & Push Docker Image**:
   - Uses Docker Buildx for multi-platform builds.
   - Logs in to Docker Hub and pushes the image.
3. **Deploy to EC2**:
   - SSHs into the EC2 instance.
   - Pulls the latest Docker image.
   - Stops and removes the current container.
   - Runs the new container on port 8080.
   - Performs a health check and rolls back if necessary.

### Production Build

Before deploying, build the application:

```sh
npm run build
```

Run the app in production mode:

```sh
npm start
```

### Running in Docker

To run the application inside a Docker container:

```sh
docker build -t remix-ecommerce .
docker run -d -p 3000:3000 remix-ecommerce
```

## Styling

This application uses [Tailwind CSS](https://tailwindcss.com/) for a sleek and modern UI. Feel free to customize styles as needed. See the [Vite documentation on CSS](https://vitejs.dev/guide/features.html#css) for further customization options.

## Contributing

I welcome contributions! Please open an issue or submit a pull request to improve the project.
