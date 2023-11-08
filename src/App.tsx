// * STYLES
import './App.css'

// * PAGES
import { Landing, Register, Error } from './pages'

// * RR
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AddJob, AllJobs, Layout, Profile, Stats } from './pages/Dashboard'

// * React Toastify
import 'react-toastify/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ProtectedRoute } from './components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  )
}

export default App
