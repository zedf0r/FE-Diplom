import { Route, Routes } from "react-router";
import { CatalogLayout, Layout, PassangerLayout } from "./components";
import { lazy } from "react";

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("@/pages/CatalogPage/CatalogPage"));
const CardPage = lazy(() => import("@/pages/CardPage/CardPage"));
const PassengersPage = lazy(
  () => import("@/pages/PassangersPage/PassengersPage")
);
const PaymentPage = lazy(() => import("@/pages/PaymentPage/PaymentPage"));
const OrderPage = lazy(() => import("@/pages/OrderPage/OrderPage"));
const OrderSuccessPage = lazy(
  () => import("@/pages/OrderSuccessPage/OrderSuccessPage")
);

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="catalog" element={<CatalogLayout />}>
          <Route index element={<CatalogPage />} />
          <Route path=":id" element={<CardPage />} />
          <Route path=":id/passengers" element={<PassangerLayout />}>
            <Route index element={<PassengersPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="payment/order" element={<OrderPage />} />
          </Route>
        </Route>
        <Route path="success" element={<OrderSuccessPage />} />
      </Route>
    </Routes>
  );
}

export default App;
