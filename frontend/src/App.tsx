import { Route, Routes } from "react-router";
import { Layout } from "./components";
import { HomePage, CatalogPage, CardPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
