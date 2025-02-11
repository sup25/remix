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
import { ToastContainer, Zoom } from "react-toastify";
import Custom404 from "./components/custom404";
import { SomethingWentWrong } from "./components/somethingWentWrong";

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
  return [
    { title: "Remix Store" },
    {
      name: "description",
      content: "A modern e-commerce store built with Remix",
    },
    { property: "og:title", content: "Remix Store" },
    {
      property: "og:description",
      content: "A modern e-commerce store built with Remix",
    },
    {
      property: "og:image",
      content:
        "https://res.cloudinary.com/dmufwerzv/image/upload/v1739260327/android-chrome-512x512_gje9k9.png",
    },
    { property: "og:url", content: "https://remixstore.duckdns.org" },
    { property: "og:type", content: "website" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <Meta />
        <Links />
      </head>
      <body className=" bg-[#f7f7f7]">
        <Provider store={store}>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            theme="light"
            transition={Zoom}
            stacked={true}
          />
          <div className="mb-20">
            <NavBar />
          </div>
          {children}
          <div className="mt-32">
            <Footer />
          </div>
          <ScrollRestoration />
          <Scripts />
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
      {error instanceof Error && (
        <div>
          {" "}
          <SomethingWentWrong />
        </div>
      )}
      {isRouteErrorResponse(error) && (
        <div>
          <SomethingWentWrong />
        </div>
      )}
    </div>
  );
}
