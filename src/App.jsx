import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home.jsx'
import Track from './pages/Track.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import { useTheme } from './context/ThemeContext.jsx'

function App() {
  const { theme } = useTheme()

  return (
    <BrowserRouter basename="/mobilefixpro">   {/* <-- IMPORTANT FIX */}
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Home />
              </motion.div>
            }/>
            
            <Route path="/track" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Track />
              </motion.div>
            }/>
            
            <Route path="/login" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Login />
              </motion.div>
            }/>
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App