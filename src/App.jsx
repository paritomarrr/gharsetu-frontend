import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import Navbar from './components/common/Navbar'
import PropertyView from './screens/PropertyView'
import Footer from './components/common/Footer'


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:mode" element={<PropertyView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
