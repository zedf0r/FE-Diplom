import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/FE-Diplom">
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorTextPlaceholder: "#818181",
            },
            Carousel: {
              dotHeight: 20,
              dotWidth: 20,
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
