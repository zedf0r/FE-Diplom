import { Route, Routes } from "react-router";
import { Layout } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}

export default App;
