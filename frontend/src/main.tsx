import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorTextPlaceholder: "#818181",
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
