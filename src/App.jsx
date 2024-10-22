import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import Navbar from './components/common/Navbar'
import PropertyView from './screens/PropertyView'
import Footer from './components/common/Footer'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:mode" element={<PropertyView />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
