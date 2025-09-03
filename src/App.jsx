import { Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import ForgotPassword from './pages/Forgot-Password'
import ResetPassword from './pages/Reset-Password'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import About from './pages/About'

import Footer from './components/Footer'

import Head from './components/Head'
import { ChatBox }  from './components/ChatBox'
import AdminChat from './pages/AdminChat'
import CreateProperty from './pages/CreateProperty'
import PropertyDetails from './pages/PropertyDetails'
import AdminPropertyManagement from './pages/AdminPropertyManagement'
import EditProperty from './pages/EditProperty'
import UsersList from './pages/UsersList'
import Profile from './pages/Profile'
import Properties from './pages/Properties'

export function App() {
  return (
    <div className='text-black'>
        <Head />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path='/chat-admin' element={<AdminChat />} />
          <Route path='/create-property' element={<CreateProperty />} />
          <Route path='/property/:id' element={<PropertyDetails />} />
          <Route path='/admin/properties' element={<AdminPropertyManagement />} />
          <Route path='/admin/edit-property/:id' element={<EditProperty />} />
          <Route path='/admin/users' element={<UsersList />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/properties' element={<Properties />} />
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
    </div>
  )
}
