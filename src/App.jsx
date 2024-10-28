import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import Navbar from './components/common/Navbar'
import PropertyView from './screens/PropertyView'
import Footer from './components/common/Footer'
import { Toaster } from 'react-hot-toast'
import PropertyPage from './screens/PropertyPage'


function App() {

  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties/:mode" element={<PropertyView />} />
        <Route path='/property/:id' element={<PropertyPage/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
