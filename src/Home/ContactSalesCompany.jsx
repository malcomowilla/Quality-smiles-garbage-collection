import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaTruck, FaBuilding, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { useApplicationSettings } from '../settings/ApplicationSettings'
import { FaWhatsapp } from "react-icons/fa";



const ContactSalesCompany = () => {
  const { companySettings } = useApplicationSettings()
  const { company_name, contact_info, email_info } = companySettings

  const [inquiryType, setInquiryType] = useState('business')
  const [loading, setLoading] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Contact {company_name} Sales Team
          </h1>
          {/* <p className="text-xl text-gray-600">
            Choose your business type to get started
          </p> */}
        </motion.div>

        {/* Business Type Selection */}
        <motion.div variants={containerVariants} className="mb-12">
          <div className="">
            {/* <motion.div
              variants={itemVariants}
              className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all ${
                inquiryType === 'business' ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-white'
              }`}
              onClick={() => setInquiryType('business')}
            >
              <FaBuilding className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Business Customer</h3>
              <p className="text-gray-600">
                I want to use {company_name}'s platform for my waste management needs
              </p>
            </motion.div> */}

            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all ${
                inquiryType === 'provider' ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-white'
              }`}
              onClick={() => setInquiryType('provider')}
            >
              <FaTruck className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Service Provider</h3>
              <p className="text-gray-600">
                I want to become a waste collection service provider
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={containerVariants} className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {inquiryType === 'business' 
              ? 'Get Started with Smart Waste Management' 
              : 'Become a Service Provider'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Requirements for {inquiryType === 'business' ? 'Businesses' : 'Service Providers'}:
              </h3>
              <ul className="space-y-3 text-gray-600">
                {inquiryType === 'business' ? (
                  <>
                    <li>• Valid business registration</li>
                    <li>• Physical business address</li>
                    <li>• Minimum 6-month contract</li>
                    <li>• Designated waste management coordinator</li>
                  </>
                ) : (
                  <>
                    <li>• Valid waste collection license</li>
                    <li>• Minimum 2 collection vehicles</li>
                    <li>• Proof of insurance</li>
                    <li>• Background check clearance</li>
                    <li>• Service area commitment</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us:</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="w-5 h-5 text-emerald-600 mr-3" />
                  
                  <a href={`tell:${contact_info}`}><span className='text-black'>{contact_info}</span></a>

                </div>
                <div className="flex items-center">
                  <FaEnvelope className="w-5 h-5 text-emerald-600 mr-3" />
                  {/* <span>{email_info}</span> */}
                  <a href={`mailto:${email_info}`}>  <span className='text-black'>Email </span></a>
                </div>


                <div className='flex items-center'>
                    <FaWhatsapp className="w-5 h-5 text-emerald-600 mr-3" />
                    <a href="https://wa.me/254791568852"><span className='text-black'>Whatsapp </span></a>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="w-5 h-5 text-emerald-600 mr-3" />
                  <span>Visit our office for a demo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Contact our sales team via phone or email</li>
              <li>Schedule an initial consultation</li>
              <li>Get a personalized demo of our platform</li>
              <li>Review and sign service agreement</li>
              <li>Begin onboarding process</li>
            </ol>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div variants={containerVariants} className="mt-8 text-center text-gray-600">
          {/* <p>
            For immediate assistance, call us at {contact_info}
          </p> */}
          <p className="mt-2">
            Business hours: Monday - Friday, 9:00 AM - 5:00 PM
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactSalesCompany