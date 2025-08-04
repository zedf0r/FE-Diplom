import { Route, Routes } from "react-router";
import { Layout } from "./components";
import { HomePage, CatalogPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
      </Route>
    </Routes>
  );
}

export default App;
