/* Framework imports -------------------------------------------------------- */
import React from 'react'

/* Module imports ----------------------------------------------------------- */
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

/* Component imports -------------------------------------------------------- */
// Layouts
import MainLayout from 'layouts/MainLayout/MainLayout'
// Main Pages
import LoginPage from 'pages/AuthPages/LoginPage/LoginPage'
import SorterPage from 'pages/SorterPage/SorterPage'

/* Component declaration ---------------------------------------------------- */
interface AuthRouterProps {}

const Router: React.FC<AuthRouterProps> = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout />}
      >
        <Route
          index
          element={
            <Navigate
              to="/sorter"
              replace
            />
          }
        />
        <Route
          path="sorter"
          element={<SorterPage />}
        />
      </Route>
    </Routes>
  )
}

export default Router
