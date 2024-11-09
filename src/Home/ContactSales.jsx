
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ContactSales = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    business_type: '',
    contact_person: '',
    business_email: '',
    phone_number: '',
    expected_users: '',
    country: '',
    city: '',
    message: '',
    company_website: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact_requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact_request: formData }),
      });

      if (response.ok) {
        toast.success('Request submitted successfully! Our team will contact you soon.');
        setFormData({
          company_name: '',
          business_type: '',
          contact_person: '',
          business_email: '',
          phone_number: '',
          expected_users: '',
          country: '',
          city: '',
          message: '',
          company_website: ''
        });
      } else {
        toast.error('Failed to submit request. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Request Enterprise Access
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Please provide your business details and we'll get back to you within 24 hours.
          </p>
        </div>

        <motion.form 
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Company Information */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:ring-2 
                  focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Business Type *
              </label>
              <select
                name="business_type"
                value={formData.business_type}
                onChange={handleChange}
                required
                className="shadow border rounded w-full py-2 px-3 text-gray-700 
                  leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Type</option>
                <option value="waste_management">Waste Management</option>
                <option value="recycling">Recycling</option>
                <option value="environmental_services">Environmental Services</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Contact Person Details */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contact Person *
              </label>
              <input
                type="text"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:ring-2 
                  focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Business Email *
              </label>
              <input
                type="email"
                name="business_email"
                value={formData.business_email}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:ring-2 
                  focus:ring-emerald-500"
              />
            </div>

            {/* Additional Fields */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:ring-2 
                  focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Expected Number of Users *
              </label>
              <select
                name="expected_users"
                value={formData.expected_users}
                onChange={handleChange}
                required
                className="shadow border rounded w-full py-2 px-3 text-gray-700 
                  leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Range</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201+">201+</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:ring-2 
                  focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:ring-2 
                  focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Message */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Additional Information
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 
                text-gray-700 leading-tight focus:outline-none focus:ring-2 
                focus:ring-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold 
                py-3 px-6 rounded focus:outline-none focus:shadow-outline
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </motion.button>
          </div>
        </motion.form>

        <div className="text-center mt-8 text-gray-600">
          <p>Already have an account? <a href="/signin" className="text-emerald-600 hover:text-emerald-700">Sign in here</a></p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactSales;





























