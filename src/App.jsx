import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import Navbar from './components/common/Navbar'


function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
