import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import Registry from "./pages/Registry.jsx";
import Uploads from "./pages/Uploads.jsx";
import Reports from "./pages/Reports.jsx";
import Dictionaries from "./pages/Dictionaries.jsx";
import ProjectsSF from "./pages/ProjectsSF.jsx";
import EditRegistry from "./pages/EditRegistery.jsx";
import EditProject from "./pages/EditProject.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="registry" element={<Registry />} />
        <Route path="projects-sf" element={<ProjectsSF />} />
        <Route path="uploads" element={<Uploads />} />
        <Route path="reports" element={<Reports />} />
        <Route path="dictionaries" element={<Dictionaries />} />
        <Route path="edit-registry/:id" element={<EditRegistry />} />
        <Route path="edit-project/:id" element={<EditProject />} />
      </Route>
    </Routes>
  );
}
