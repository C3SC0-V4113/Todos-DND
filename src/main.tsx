import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { TodoRouter } from "./router/TodoRouter.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoRouter />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
