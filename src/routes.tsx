import { Suspense } from "react";
import { type RouteObject } from "react-router-dom";
import TodoApp from "./pages/List";

export const routes: Array<RouteObject> = [
    {
      index: true,
      element: (
        <Suspense>
          <TodoApp/>
        </Suspense>
      ),
    },
  ];
  
  export default routes;
  