import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <GlobalStyles>
      <Router>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {" "}
            <App />
          </QueryClientProvider>
        </Provider>
      </Router>
    </GlobalStyles>
  </React.StrictMode>
);
