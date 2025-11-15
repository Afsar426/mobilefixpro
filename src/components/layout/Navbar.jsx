import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { theme } = useTheme()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-display font-bold text-gray-900 dark:text-white">
                MobileFixPro
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
              Home
            </Link>
            <Link to="/track" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
              Track
            </Link>
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar