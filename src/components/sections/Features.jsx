import { motion } from 'framer-motion'
import { staggerContainer, fadeIn } from '../../utils/animations.js'

const features = [
  {
    icon: '⚡',
    title: '30-Minute Repair',
    description: 'Most repairs completed on-site in under 30 minutes while you wait.'
  },
  {
    icon: '📍',
    title: 'Track Technician',
    description: 'Real-time GPS tracking shows exactly when your technician will arrive.'
  },
  {
    icon: '🔧',
    title: 'Expert Technicians',
    description: 'Certified professionals with 5+ years of experience.'
  },
  {
    icon: '🛡️',
    title: 'Lifetime Warranty',
    description: 'All repairs come with a lifetime warranty on parts and labor.'
  },
  {
    icon: '💰',
    title: 'Transparent Pricing',
    description: 'Upfront quotes with no hidden fees. Pay only when satisfied.'
  },
  {
    icon: '🏠',
    title: 'Doorstep Service',
    description: 'We come to you - home, office, or anywhere in the city.'
  }
]

const Features = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Why Choose MobileFixPro?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Premium service with cutting-edge technology
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card rounded-2xl p-8 text-center cursor-pointer"
            >
              <motion.div
                className="text-5xl mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring' }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features