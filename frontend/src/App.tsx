import { Route, Routes } from "react-router";
import { Layout } from "./components";
import { HomePage } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
