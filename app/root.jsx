import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import MainNavigation from '~/components/nav/MainNavigation';

import mainStyles from '~/styles/main.css';


export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export function links () {
  return [
    {
      rel: 'stylesheet',
      href: mainStyles
    },
  ];
}

export default function App () {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary ({ error }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <div className="error">
          <p>Sorry! The following error ocurred in Application:</p>
          {error.message}
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary () {
  const { data } = useCatch();
  const message = data?.message || 'Problem unknowledge';

  return (

    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <div className="error">
          <h3>CatchBoundary</h3>
          <p>Sorry! The following error ocurred in Application:</p>
          <p>{message}</p>
          {/* <code>{JSON.stringify(data, null, 2)}</code> */}
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}