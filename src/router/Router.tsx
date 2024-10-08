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
import ImagePickerPage from 'pages/ImagePickerPage/ImagePickerPage'
import ImageMakerPage from 'pages/ImageMakerPage/ImageMakerPage'
import ImgurLoginPage from 'pages/ImgurLoginPage/ImgurLoginPage'

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
          path="image-picker"
          element={<ImagePickerPage />}
        />
        <Route
          path="custom-image-maker"
          element={<ImageMakerPage />}
        />
        <Route
          path="imgur-auth/:auth"
          element={<ImgurLoginPage />}
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
