import { Route, Routes } from "react-router";
import { CatalogLayout, Layout } from "./components";
import { HomePage, CatalogPage, CardPage, PassangersPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="catalog" element={<CatalogLayout activeStep={1} />}>
          <Route index element={<CatalogPage />} />
          <Route path=":id" element={<CardPage />} />
        </Route>
        <Route
          path="/catalog/:id/passengers"
          element={<CatalogLayout activeStep={2} />}
        >
          <Route index element={<PassangersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
