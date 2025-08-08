import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "FE-Diplom"}>
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
            Switch: {
              handleBg: "#ffa800",
              colorPrimary: "#fcdc9d",
              colorPrimaryHover: "#fcdc9d",
              colorTextQuaternary: "#fff",
              colorTextTertiary: "#fff",
              trackMinWidth: 72,
              trackHeight: 26,
              handleSize: 28,
              trackPadding: -1,
            },
            Slider: {
              dotActiveBorderColor: "#fff",
              handleActiveColor: "#fff",
              dotBorderColor: "#fff",
              handleActiveOutlineColor: "#fff",
              handleColor: "#fff",
              trackHoverBg: "#ffa800",
              trackBg: "#ffa800",
              railSize: 19,
              handleSize: 24,
              dotSize: 0,
              handleLineWidth: 0,
              railBg: "transparent",
              railHoverBg: "transparent",
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
