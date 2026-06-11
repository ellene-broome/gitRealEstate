import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PropertyDetails from "./pages/PropertyDetails";
import LeadsPage from "./pages/LeadsPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/listing/:id"
        element={<PropertyDetails />}
      />

      <Route
        path="/leads"
        element={<LeadsPage />}
      />
    </Routes>
  );
}

export default App;