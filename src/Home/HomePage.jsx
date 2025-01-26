import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { FaRecycle, FaChartLine, FaCloud, FaMobileAlt, FaQrcode, FaUsersCog, FaTruck, FaLeaf } from 'react-icons/fa'
import { BiArrowFromBottom } from 'react-icons/bi'
import Lottie from 'react-lottie'
import WasteAnimation from '../animation/waste_management.json'

const HomePage = () => {
  const [activeStory, setActiveStory] = useState(0)
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const isHeroInView = useInView(heroRef)


  const subdomain = window.location.hostname.split('.')[0]
  console.log('subdomain', subdomain)

  const scrollToElement = () => {
    const {current} =  heroRef
     if (current !== null){
       current.scrollIntoView({behavior: "smooth"})
     }
  }

  const y = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: WasteAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const customerStories = [
    {
      company: "Major City Operations",
      logo: "🏢",
      quote: "AITechs platform helped us optimize our entire fleet operations. The AI-driven routes and real-time tracking transformed our efficiency.",
      person: "Operations Director",
      impact: "40% reduction in fuel costs"
    },
    {
      company: "Regional Waste Services",
      logo: "🚛",
      quote: "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions that improve our service quality.",
      person: "Technology Manager",
      impact: "85% improvement in route efficiency"
    },
    {
      company: "Urban Solutions Inc",
      logo: "🌆",
      quote: "Implementing AITechs was seamless. The platform's intelligent routing has revolutionized how we manage our daily operations.",
      person: "Chief Operations Officer",
      impact: "60% fewer customer complaints"
    }
  ]

  const problemSolutions = [
    {
      problem: "Inefficient garbage collection scheduling",
      solution: "QR-coded bags with instant collection requests",
      icon: <FaQrcode className="w-12 h-12 text-emerald-500" />,
      animation: "slideRight"
    },
    {
      problem: "Difficulty tracking collection status",
      solution: "Real-time tracking and collection confirmation",
      icon: <FaMobileAlt className="w-12 h-12 text-emerald-500" />,
      animation: "slideLeft"
    },
    {
      problem: "Complex navigation to customer locations",
      solution: "Integrated Google Maps navigation",
      icon: <FaTruck className="w-12 h-12 text-emerald-500" />,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % customerStories.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-600/90" />
          <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-center text-white"
          >
            <motion.div
              animate={{ scale: isHeroInView ? 1 : 0.8 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                Aitechs
                <span className="block text-emerald-300">Smart Garbage Collection Platform</span>
              </h1>
              <p className="text-xl md:text-3xl text-gray-200 max-w-3xl mx-auto">
                Revolutionizing waste management with QR-coded bags and real-time collection requests.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact-sales"
                  className="group relative px-8 py-4 bg-emerald-500 text-white rounded-lg font-semibold overflow-hidden"
                >
                  <span className="relative z-10">Schedule Demo</span>
                  
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-16"
          >
            {problemSolutions.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">The Problem:</h3>
                  <p className="text-xl text-red-500 mb-4">{item.problem}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Solution:</h3>
                  <p className="text-xl text-emerald-500">{item.solution}</p>
                </div>
                <div className="flex-1">
                  <Lottie options={defaultOptions} height={300} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Stories Carousel */}
      <section className="py-20 bg-emerald-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-emerald-800 rounded-xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{customerStories[activeStory].logo}</span>
                  <h3 className="text-2xl font-bold">{customerStories[activeStory].company}</h3>
                </div>
                <blockquote className="text-xl italic mb-4">
                  "{customerStories[activeStory].quote}"
                </blockquote>
                <p className="text-emerald-300">{customerStories[activeStory].person}</p>
                <div className="mt-4 bg-emerald-700 rounded p-4">
                  <p className="font-bold">Impact:</p>
                  <p>{customerStories[activeStory].impact}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-black">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to transform your waste management operations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2 text-black">QR Code System</h3>
              <p className="text-gray-600">
                Smart QR-coded recycling bags for easy registration and collection requests.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2 text-black">Customer Portal</h3>
              <p className="text-gray-600">
                User-friendly portal for bag registration and scheduling pickups.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold mb-2 text-black">Location Services</h3>
              <p className="text-gray-600">
                Integrated Google Maps navigation for efficient pickup routes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-black">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At EcoCollect, we're not just collecting waste - we're building a cleaner, more sustainable future 
              for cities worldwide. Here's how we're making a difference:
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2 text-black">Environmental Impact</h3>
              <p className="text-gray-600">
                Our smart routes and efficient collection systems have helped cities reduce their carbon emissions 
                by up to 40%, contributing to a cleaner environment.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2 text-black">Cost Efficiency</h3>
              <p className="text-gray-600">
                Cities using our platform save an average of 45% on operational costs through optimized routes 
                and better resource utilization.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2 text-black">Service Excellence</h3>
              <p className="text-gray-600">
                Our QR code system and real-time tracking have helped achieve a 95% on-time collection rate, 
                leading to happier residents and cleaner communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants}>
              <FaLeaf className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-8 text-black">Environmental Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">40%</h3>
                  <p className='text-gray-700'>Reduction in CO2 Emissions</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">60%</h3>
                  <p className='text-gray-700'>Less Fuel Consumption</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">95%</h3>
                  <p className='text-gray-700'>Route Optimization</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >

        <div onClick={() => scrollToElement()}
          to="/contact-sales"
          className="flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full
           shadow-lg hover:bg-emerald-700 transition-colors cursor-pointer"
        >
          <BiArrowFromBottom   className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      {/* Footer with Animation */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-white font-semibold mb-4">EcoCollect Solutions</h3>
              <p className="text-sm">
                Transforming waste management with smart QR-coded bags and real-time collection services.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm">Email: sales@ecocollect.com</p>
              <p className="text-sm">Phone: +1 (555) 123-4567</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="text-sm space-y-2">
                <li><Link to="/case-studies" className="hover:text-white">Case Studies</Link></li>
                <li><Link to="/sustainability" className="hover:text-white">Sustainability Report</Link></li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </footer>
    </div>
  )
}

export default HomePage