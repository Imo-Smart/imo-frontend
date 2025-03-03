import { Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AdminRouter from './components/AdminRouter'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'

import Head from './components/Head'
import { ChatBox } from './components/ChatBox'

export function App() {
  return (
    <>
        <Head />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRouter>
                <Dashboard />
              </AdminRouter>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <ChatBox />
      <Footer />
    </>
  )
}
