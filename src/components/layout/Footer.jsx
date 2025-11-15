import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-gray-900 text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">MobileFixPro</h3>
            <p className="text-gray-400">Premium mobile repair services at your doorstep.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/">Screen Repair</Link></li>
              <li><Link to="/">Battery Replacement</Link></li>
              <li><Link to="/">Water Damage</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">FAQ</Link></li>
              <li><Link to="/">Warranty</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 text-gray-400">
              <span>📧 support@mobilefixpro.com</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 MobileFixPro. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer