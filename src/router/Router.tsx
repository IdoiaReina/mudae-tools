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
import SorterPage from 'pages/SorterPage/SorterPage'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'

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
              to="/harem-sorter"
              replace
            />
          }
        />
        <Route
          path="harem-sorter"
          element={<SorterPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  )
}

export default Router
