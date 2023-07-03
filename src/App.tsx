import { Navigate, Route, Routes } from "react-router-dom";
import {
  Home,
  Landing,
  MockAnswer,
  MockCreate,
  Mocks,
  Profile,
  Result,
  Subjects,
  SubjectsCreate,
} from "./pages";
import { PrivateRoute } from "./components";
import { useSelector } from "react-redux";
import { RootState } from "./main";

function App() {
  const { data } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = data !== null && data !== "";

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Landing />
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
          path="/profile"
          element={
            <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
              <Profile />
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
          path="/mocks/answer"
          element={
            <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
              <MockAnswer />
            </PrivateRoute>
          }
        />
        <Route
          path="/mocks/result"
          element={
            <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
              <Result />
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
        <Route
          path="/subjects/create"
          element={
            <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
              <SubjectsCreate />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
