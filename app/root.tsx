import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import "./index.css";
import "./tailwind.css";
import NavBar from "./components/navbar";
import { Provider } from "react-redux";
import store from "./context/store";
import Footer from "./components/footer";
import { CartProvider } from "./context/shoppingCart";
import { ToastContainer, Zoom } from "react-toastify";
import Custom404 from "./components/custom404";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Arima:wght@100..700&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
  },
];
export const meta: MetaFunction = () => {
  return [{ title: "Remix" }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <Meta />
        <Links />
      </head>
      <body className="min-h-screen  bg-[#f7f7f7]">
        <Provider store={store}>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            theme="light"
            transition={Zoom}
            stacked={true}
          />
          <CartProvider>
            <div className="mb-20">
              <NavBar />
            </div>
            {children}
            <div className="mt-32">
              <Footer />
            </div>
            <ScrollRestoration />
            <Scripts />
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <Custom404 />;
  }

  return (
    <div className="error-page">
      <Custom404 />
      {error instanceof Error && <div>{error.message}</div>}
      {isRouteErrorResponse(error) && (
        <div>
          {error.status} {error.statusText}
        </div>
      )}
    </div>
  );
}
