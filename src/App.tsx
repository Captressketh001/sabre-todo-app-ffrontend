import { Fragment } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster  } from "react-hot-toast";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <ScrollRestoration />
        <Toaster/>
      </QueryClientProvider>
    </Fragment>
    
  );
}
