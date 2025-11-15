import { motion } from 'framer-motion'
import { useState } from 'react'

const testimonials = [
  {
    name: 'farman',
    rating: 5,
    comment: 'The technician arrived in 20 minutes and fixed my iPhone screen in under 30. Amazing service!',
    location: 'indore, NYC'
  },
  {
    name: 'vishal',
    rating: 5,
    comment: 'Real-time tracking was so helpful. I could see exactly when the tech would arrive. Highly recommend!',
    location: 'indore, NYC'
  },
  {
    name: 'Abhinav',
    rating: 4,
    comment: 'AI assistant helped diagnose the issue quickly. The repair cost was exactly what was quoted. Very transparent!',
    location: 'indore, star city'
  }
]

const Testimonials = () => {
  const [active, setActive] = useState(0)

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Over 10,000+ satisfied customers
          </p>
        </motion.div>

        <motion.div
          key={active}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring' }}
          className="glass-card rounded-2xl p-8 text-center"
        >
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-2xl ${i < testimonials[active].rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                ⭐
              </span>
            ))}
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 italic">
            "{testimonials[active].comment}"
          </p>
          <div className="text-gray-900 dark:text-white font-bold">
            {testimonials[active].name}
          </div>
          <div className="text-sm text-gray-500">
            {testimonials[active].location}
          </div>
        </motion.div>

        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                active === index ? 'bg-primary-500 w-8' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials