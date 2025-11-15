import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "../../context/BookingContext.jsx";

import StepDevice from "./StepDevice.jsx";
import StepAddress from "./StepAddress.jsx";
import StepReview from "./StepReview.jsx";

import Lottie from "lottie-react";
import successAnimation from "../../assets/lottie/success.json";

const BookingWizard = () => {
  const { currentStep, isSubmitting, resetBooking } = useBooking();

  // Local success state
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { component: StepDevice, title: "Select Device" },
    { component: StepAddress, title: "Location & Time" },
    { component: StepReview, title: "Review & Confirm" },
  ];

  const progress = (currentStep / steps.length) * 100;

  // Trigger success animation
  const handleSuccess = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      resetBooking();
    }, 4000);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Book Your Repair
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get your device fixed in 3 simple steps
          </p>
        </motion.div>

        <div className="glass-card rounded-2xl p-8">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>
                Step {currentStep} of {steps.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            <motion.div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </motion.div>
          </div>

          {/* Step Content or Success Screen */}
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <Lottie
                  animationData={successAnimation}
                  loop={false}
                  className="w-48 h-48 mx-auto"
                />
                <h3 className="text-2xl font-bold text-primary-500 mt-4 mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A technician will arrive at your location soon.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                {steps.map((step, index) => {
                  const StepComponent = step.component;

                  return currentStep === index + 1 ? (
                    <div key={index}>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {step.title}
                      </h3>

                      <StepComponent onSuccess={handleSuccess} />
                    </div>
                  ) : null;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BookingWizard;