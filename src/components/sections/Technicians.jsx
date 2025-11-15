import { motion } from 'framer-motion'
import { fadeIn } from '../../utils/animations.js'

const technicians = [
  {
    name: 'Ayush singh',
    rating: 4.9,
    repairs: 1250,
    specializations: ['iPhone', 'Samsung', 'iPad'],
    status: 'Available'
  },
  {
    name: 'Abhi jain',
    rating: 4.8,
    repairs: 980,
    specializations: ['Google Pixel', 'OnePlus', 'Motorola'],
    status: 'En Route'
  },
  {
    name: ' afshuu',
    rating: 5.0,
    repairs: 2100,
    specializations: ['iPhone', 'iPad', 'MacBook'],
    status: 'Available'
  }
]

const Technicians = () => {
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
            Our Expert Technicians
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Certified professionals ready to help
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technicians.map((tech, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">{tech.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {tech.name}
                  </h3>
                  <div className="flex items-center text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">
                      {tech.rating} ({tech.repairs} repairs)
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Specializations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {tech.specializations.map(spec => (
                    <span key={spec} className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <motion.div
                animate={{ backgroundColor: tech.status === 'Available' ? '#10b981' : '#f59e0b' }}
                className="text-white text-center py-2 rounded-lg font-bold"
              >
                {tech.status}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Technicians