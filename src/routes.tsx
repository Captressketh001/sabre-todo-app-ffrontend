import { Suspense } from "react";
import { type RouteObject } from "react-router-dom";
import TodoApp from "./pages/List";
import Description from "./pages/Description";

export const routes: Array<RouteObject> = [
  {
    index: true,
    element: (
      <Suspense>
        <TodoApp />
      </Suspense>
    ),
  },
  {
    path: "/about",
    children: [
      {
        path: "",
        element: <Description />,
      },
    ],
  },
];

export default routes;
