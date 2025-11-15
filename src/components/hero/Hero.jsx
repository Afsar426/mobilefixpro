import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeIn, typingAnimation } from '../../utils/animations.js'

const Hero = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500"
        animate={{
          background: [
            'linear-gradient(135deg, #0d9488, #ea580c)',
            'linear-gradient(135deg, #ea580c, #fbbf24)',
            'linear-gradient(135deg, #fbbf24, #0d9488)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 15}%`,
              bottom: '10%'
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeIn}>
            <motion.h1
              className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Fix Your Phone
              <motion.span
                className="block text-accent-400"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                At Your Doorstep
              </motion.span>
            </motion.h1>

            <motion.div
              className="text-xl text-white/90 mb-8 h-16"
              variants={typingAnimation}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-primary-400"
                animate={{ width: ["0%", "100%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
              >
                Professional repairs in 30 minutes or less.
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/" className="btn-primary text-center text-lg px-8 py-4">
                Book Repair Now
              </Link>
              <Link to="/track" className="glass-card text-center text-lg px-8 py-4 text-white hover:bg-white/20 transition-all">
                Track Technician
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            {/* Floating phone mockup */}
            <motion.div
              className="floating-phone relative mx-auto w-80 h-96"
              animate={{
                rotateY: [0, 5, -5, 0],
                rotateX: [0, -5, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-lg border border-white/20 shadow-2xl" />
              <div className="relative p-8 flex flex-col items-center justify-center h-full">
                <div className="w-32 h-64 bg-black rounded-2xl shadow-2xl mb-6 overflow-hidden">
                  <div className="h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">📱</span>
                  </div>
                </div>
                <motion.div
                  className="text-white text-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <p className="text-2xl font-bold">90%</p>
                  <p className="text-sm">Customer Satisfaction</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Rotating circles */}
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 border-2 border-accent-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-24 h-24 border-2 border-secondary-400/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero