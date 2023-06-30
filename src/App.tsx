import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Landing, MockCreate, Mocks, Subjects } from "./pages";
import { PrivateRoute } from "./components";
import { useSelector } from "react-redux";
import { RootState } from "./main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { data } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = data !== null && data !== "";

  return (
    <>
      <ToastContainer />

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
        <Route
          path="/mocks/create"
          element={
            <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
              <MockCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
              <Subjects />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
