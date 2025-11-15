import { motion } from 'framer-motion'
import Hero from '../components/hero/Hero.jsx'
import Features from '../components/sections/Features.jsx'
import HowItWorks from '../components/sections/HowItWorks.jsx'
import Technicians from '../components/sections/Technicians.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import BookingWizard from '../components/booking/BookingWizard.jsx'
import ChatBot from '../components/chat/ChatBot.jsx'

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen"
    >
      {/* Hero Section with Parallax Effects */}
      <Hero />
      
      {/* Features Section with Staggered Animations */}
      <Features />
      
      {/* How It Works - 3 Step Process */}
      <HowItWorks />
      
      {/* Booking Wizard with Lottie Animations */}
      <BookingWizard />
      
      {/* Live Technicians Showcase */}
      <Technicians />
      
      {/* Customer Testimonials Carousel */}
      <Testimonials />
      
      {/* Floating AI Chat Assistant */}
      <ChatBot />
    </motion.div>
  )
}

export default Home