import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";
import AIChat from "./pages/AIChat";

import ProtectedRoute from "./components/layout/ProtectedRoute";
import AuthRedirect from "./components/layout/AuthRedirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}

        <Route
          path="/"
          element={
            <AuthRedirect>
              <Home />
            </AuthRedirect>
          }
        />

        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />

        <Route
          path="/register"
          element={
            <AuthRedirect>
              <Register />
            </AuthRedirect>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budgets"
          element={
            <ProtectedRoute>
              <Budgets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
