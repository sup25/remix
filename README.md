# ECommerce App with Remix

An eCommerce platform built using [Remix](https://remix.run/) that provides a seamless shopping experience with modern web development techniques. This app includes features like product listings, user authentication, a shopping cart, order management etc.

## Features

- User authentication (Sign-up, Login, Logout)
- Product catalog with categories and filters
- Shopping cart and checkout process
- Responsive design for mobile and desktop
- SEO-friendly with server-side rendering (SSR)

## Tech Stack

- **Framework**: [Remix](https://remix.run/)
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Remix Loaders/Actions
- **Database**: PostgreSQL (via Prisma)
- **Payment Gateway**: eSewa
- **Deployment**: (Planned) Vercel, AWS, or Fly.io

## Installation

Clone the repository:

```bash
git clone https://github.com/sup25/remix.git
cd remix
```

## Install dependencies:

```bash
npm install
```

## Configure environment variables: Create a .env file in the root directory and add the following:

```bash
DATABASE_URL= your_database_url
```

## Run database migrations (if using Prisma):

```bash
npx prisma migrate dev
```

## Start the development server:

```bash
npm run dev
```

## Open the app in your browser:

```bash
http://localhost:5173
```

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
