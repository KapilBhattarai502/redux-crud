import { lazy } from "react";

const list = [
  {
    path: "/",
    component: lazy(() => import("./Layouts/MainLayout")),
    exact: true,
    children: [
      {
        path: "",
        component: lazy(() => import("./Components/Home")),
        exact: true,
      },
      {
        path: "/create",
        component: lazy(() => import("./Components/Create")),
        exact: true,
      },
      {
        path: "/edit/:id",
        component: lazy(() => import("./Components/Edit")),
      },
    ],
  },
  {
    path: "/drawer",
    component: lazy(() => import("./Components/DrawerComponent")),
    exact: true,
  },
];

export default list;
