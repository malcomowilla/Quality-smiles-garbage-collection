import { useState,useCallback,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaRecycle, FaChartLine, FaCloud, FaMobileAlt, FaQrcode, FaUsersCog,
   FaLeaf } from 'react-icons/fa'
import { useApplicationSettings } from '../settings/ApplicationSettings';

const HomePageSpecificCompany = () => {

  const {companySettings,setcompanySettings} = useApplicationSettings()

  const {company_name, contact_info, email_info, logo_preview} = companySettings

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar/Header with Logo */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={logo_preview} 
              alt="QualitySmiles" 
              className="h-10 w-auto"
            />
            <span className="ml-2 text-2xl font-bold text-emerald-600">
              {company_name}</span>
          </div>
          <div className="flex space-x-4">
            {/* <Link to="/login" className="text-gray-600 hover:text-emerald-600">Login</Link> */}
            <Link to="/signin" className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
              Sign In
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section - Updated with brand messaging */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                >
                  <span className="block xl:inline">Smart Waste Collection</span>{' '}
                  <span className="block text-emerald-600 xl:inline">by {company_name}</span>
                </motion.h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Experience hassle-free waste collection with our QR-coded bags and real-time pickup service. 
                  Schedule collections with a single tap and track your pickup in real-time.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/contact-sales-company" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10">
                      Contact Sales Team
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/how-it-works" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 md:py-4 md:text-lg md:px-10">
                      How It Works
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        {/* ... existing hero image section ... */}
      </section>

      {/* Why QualitySmiles Section */}
      <section className="py-12 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaLeaf className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              Why Choose {company_name}?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Join hundreds of satisfied waste management companies who trust
              {company_name}
              to revolutionize their operations.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 
          lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <FaQrcode className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-emerald-600">Easy Collection</h3>
                <p className="mt-2 text-gray-600">Scan QR code on your recycling bag to request pickup</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <FaMobileAlt className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-emerald-600">Real-Time Tracking</h3>
                <p className="mt-2 text-gray-600">Track your collection status live through our app</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <FaLeaf className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-emerald-600">Eco-Friendly</h3>
                <p className="mt-2 text-gray-600">Supporting sustainable waste management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Updated with brand-specific features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
              Our Services
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Smart Waste Collection Made Simple
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Experience the future of waste management with our innovative QR code system and real-time tracking
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow p-6">
                <FaQrcode className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Smart QR Bags</h3>
                <p className="mt-2 text-gray-500">
                  Each recycling bag comes with a unique QR code for easy registration and pickup requests
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <FaMobileAlt className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Mobile App</h3>
                <p className="mt-2 text-gray-500">
                  Request pickups, track collection status, and manage your account from your phone
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <FaCloud className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Real-Time Updates</h3>
                <p className="mt-2 text-gray-500">
                  Get instant notifications about your collection status and estimated arrival times
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-12">
            Trusted by Leading Waste Management Companies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">
                "The QR code system from {company_name} has made waste collection so convenient. 
                Just scan and schedule - it's that simple!"
              </p>
              <div className="mt-4">
                <p className="font-semibold">Willy Okoth</p>
                <p className="text-sm text-gray-500">CEO, EcoWaste Solutions</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">
                "Being able to track our collection in real-time has improved our service reliability tremendously. 
                {company_name}'s system is a game-changer."
              </p>
              <div className="mt-4">
                <p className="font-semibold">Sarah Kagwira</p>
                <p className="text-sm text-gray-500">Operations Manager, GreenBin Co.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated CTA Section */}
      <section className="bg-emerald-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to modernize your waste management?</span>
            <span className="block text-emerald-200">Contact our sales team to get started.</span>
          </h2>
          {/* ... existing CTA buttons ... */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{company_name}</h3>
              <p className="text-gray-400 text-sm">
                Making waste management smarter, one smile at a time.
              </p>
            </div>
            <div>
              
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400 text-sm">
                Email: {email_info}<br />
                Phone: {contact_info}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Add social media icons/links here */}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} {company_name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePageSpecificCompany
