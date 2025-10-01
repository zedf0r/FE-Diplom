import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./services/store.ts";
import { StepProvider } from "./components";

const theme = {
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
    Pagination: {
      itemActiveBg: "#FFA800",
      itemActiveColorDisabled: "#928F94",
      itemSize: 75,
      itemSizeSM: 30,
      colorText: "#928F94",
      colorPrimaryHover: "none",
      colorPrimary: "#fff",
      borderRadius: 5,
      fontFamily: "Roboto",
      fontSize: 30,
      fontWeightStrong: 700,
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StepProvider>
      <Provider store={store}>
        <BrowserRouter basename={import.meta.env.DEV ? "/" : "FE-Diplom"}>
          <ConfigProvider theme={theme}>
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </StepProvider>
  </StrictMode>
);
