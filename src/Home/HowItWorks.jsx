import { motion } from 'framer-motion'
import { FaQrcode, FaMobileAlt, FaTruck, FaRecycle, FaCheck } from 'react-icons/fa'
import { useApplicationSettings } from '../settings/ApplicationSettings'
import { Link } from 'react-router-dom'

const HowItWorks = () => {
  const { companySettings } = useApplicationSettings()
  const { company_name } = companySettings

  const steps = [
    {
      icon: <FaRecycle className="w-12 h-12 text-emerald-500" />,
      title: "Get Your Recycling Bag",
      description: `${company_name} provides you with specially marked recycling bags, each with a unique QR code for easy tracking and collection requests.`,
      animation: "slideRight"
    },
    {
      icon: <FaQrcode className="w-12 h-12 text-emerald-500" />,
      title: "Scan QR Code",
      description: "Use your smartphone to scan the QR code on your recycling bag. This registers the bag in our system and links it to your account.",
      animation: "slideLeft"
    },
    {
      icon: <FaMobileAlt className="w-12 h-12 text-emerald-500" />,
      title: "Request Collection",
      description: "When your bag is ready for collection, simply open our app and tap the request button. Choose your preferred pickup time slot.",
      animation: "slideRight"
    },
    {
      icon: <FaTruck className="w-12 h-12 text-emerald-500" />,
      title: "Track Collection",
      description: "Track your collection in real-time through our app. You'll receive notifications about estimated arrival times and collection status.",
      animation: "slideLeft"
    },
    {
      icon: <FaCheck className="w-12 h-12 text-emerald-500" />,
      title: "Confirmation",
      description: "Once collection is complete, you'll receive a confirmation notification and can rate your experience.",
      animation: "slideRight"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            How It Works
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience the simplicity of smart waste collection with {company_name}. 
            Our QR code system makes recycling effortless and efficient.
          </p>
        </motion.div>

        {/* Steps Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-20"
        >
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-emerald-200 h-full" />

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative mb-16 last:mb-0"
              >
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Icon */}
                  <div className="md:w-1/2 flex justify-center">
                    <div className="bg-white p-6 rounded-full shadow-lg relative z-10">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 mt-6 md:mt-0">
                    <div className={`bg-white p-6 rounded-lg shadow-lg ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Contact {company_name}'s sales team to learn more about our enterprise solutions.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/contact-sales-company"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Contact Sales Team
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <section className="mt-20 bg-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
              Benefits of Our Smart Collection System
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-emerald-500 text-xl font-bold mb-4">Convenient</div>
                <p className="text-gray-600">Request collections with a simple tap - no phone calls needed</p>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-emerald-500 text-xl font-bold mb-4">Transparent</div>
                <p className="text-gray-600">Track your collection status in real-time</p>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-emerald-500 text-xl font-bold mb-4">Efficient</div>
                <p className="text-gray-600">Optimized routes ensure timely collections</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
