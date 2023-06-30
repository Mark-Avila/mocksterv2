import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Landing, Mocks } from "./pages";
import { PrivateRoute } from "./components";
import { useSelector } from "react-redux";
import { RootState } from "./main";

function App() {
  const { data } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = data !== null && data !== "";

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/mocks"
        element={
          <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
            <Mocks />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
