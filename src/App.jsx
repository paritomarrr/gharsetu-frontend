import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import Navbar from './components/common/Navbar'
import PostPropertyNavbar from './components/common/PostPropertyNavbar'
import PropertyView from './screens/PropertyView'
import Footer from './components/common/Footer'
import { Toaster } from 'react-hot-toast'
import PropertyPage from './screens/PropertyPage'
import PostProperty from './screens/PostProperty'
import PostPropertyBottomBar from './components/common/PostPropertyBottomBar'
import PostPropertySteps from './screens/PostPropertySteps'
import Profile from './screens/Profile'

function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname.includes('/postProperty') ? <PostPropertyNavbar /> : <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/properties/:mode" element={<PropertyView />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/postProperty" element={<PostProperty />} />
        <Route path="/postProperty/add" element={<PostPropertySteps />} />
      </Routes>
      {location.pathname.includes('/postProperty') ? <PostPropertyBottomBar /> : <Footer/>}
    </>
  )
}

export default App
