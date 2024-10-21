import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./components/Store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Google } from "./components/Google.jsx";
import { Cards } from "./components/Cards.jsx";
import { ErrorElement } from "./components/ErrorElement.jsx";
import { Register } from "./components/Register.jsx";
import { CardDetail } from "./components/CardDetail.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Google />,
      },
      {
        path: "/User/byChannel/:channelId",
        element: <CardDetail />,
      },
      {
        path: "",
        element: <Cards />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter}></RouterProvider>
  </Provider>
);
