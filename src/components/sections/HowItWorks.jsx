import { motion } from 'framer-motion'
import { slideIn } from '../../utils/animations.js'

const steps = [
  { number: 1, title: 'Book Online', desc: 'Select your device, issue, and preferred time slot' },
  { number: 2, title: 'Track Tech', desc: 'Watch your technician arrive in real-time' },
  { number: 3, title: 'Get Repaired', desc: 'Professional repair done at your location' }
]

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Simple process, exceptional results
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={slideIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: 'spring' }}
              >
                {step.number}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks