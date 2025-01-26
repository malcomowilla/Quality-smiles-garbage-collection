// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { FaRecycle, FaChartLine, FaCloud, FaMobileAlt, FaQrcode, FaUsersCog } from 'react-icons/fa'
// import Lottie from 'react-lottie';
// import WasteAnimation from '../animation/waste_management.json'

// const str = 'The quick brown fox jumps over the lazy dog.';

// const words = str.split(' ');
// console.log(words[3]);

const subdomain = 'd4fa-105-163-157-109.ngrok-free.app'
const word = subdomain.split('.')
console.log(word[1]) 
// const HomePage = () => {
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false)









//   const defaultOptions = {
//     loop: true,
//     autoplay: true, 
//     animationData: WasteAnimation,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice'
//     }
//   };





//   const features = [
//     {
//       icon: <FaRecycle className="w-8 h-8 text-emerald-600" />,
//       title: "Smart Collection Management",
//       description: "Optimize routes and schedules with AI-powered collection management"
//     },
//     {
//       icon: <FaChartLine className="w-8 h-8 text-emerald-600" />,
//       title: "Real-time Analytics",
//       description: "Track performance metrics and generate insights with detailed reporting"
//     },
//     {
//       icon: <FaCloud className="w-8 h-8 text-emerald-600" />,
//       title: "Cloud-Based Solution",
//       description: "Access your dashboard anywhere, anytime with secure cloud hosting"
//     },
//     {
//       icon: <FaMobileAlt className="w-8 h-8 text-emerald-600" />,
//       title: "Mobile Integration",
//       description: "Native mobile apps for drivers and real-time tracking"
//     },
//     {
//       icon: <FaQrcode className="w-8 h-8 text-emerald-600" />,
//       title: "QR Code Integration",
//       description: "Seamless customer identification and tracking system"
//     },
//     {
//       icon: <FaUsersCog className="w-8 h-8 text-emerald-600" />,
//       title: "Multi-tenant Architecture",
//       description: "Secure isolation for multiple waste management companies"
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Company Name Banner */}
//       <div className="bg-emerald-700 text-white py-2 px-4 text-center">
//         <p className="text-sm font-medium">Powered by AITechs Solutions</p>
//       </div>

//       <section className="relative bg-white overflow-hidden">
//         <div className="max-w-7xl mx-auto">
//           <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
//             <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
//               <div className="sm:text-center lg:text-left">
//                 {/* Company Name */}
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="text-lg font-semibold text-emerald-600 mb-4"
//                 >
//                   AITechs Solutions presents
//                 </motion.p>
                
//                 <motion.h1 
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.1 }}
//                   className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
//                 >
//                   <span className="block xl:inline">Modern Waste Management</span>{' '}
//                   <span className="block text-emerald-600 xl:inline">Made Simple</span>
//                 </motion.h1>
//                 <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
//                   Enterprise-grade waste management solution for companies. 
//                   Streamline operations, enhance customer satisfaction, and grow your business with our secure multi-tenant platform.
//                 </p>
//                 <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
//                   <div className="rounded-md shadow">
//                     <Link
//                       to="/contact-sales"
//                       className="w-full flex items-center justify-center px-8 py-3 
//                         border border-transparent text-base font-medium rounded-md 
//                         text-white bg-emerald-600 hover:bg-emerald-700 
//                         md:py-4 md:text-lg md:px-10"
//                     >
//                       Request Access
//                     </Link>
//                   </div>
//                   <div className="mt-3 sm:mt-0 sm:ml-3">
//                     <Link
//                       to="/signin"
//                       className="w-full flex items-center justify-center px-8 py-3 
//                         border border-transparent text-base font-medium rounded-md 
//                         text-emerald-700 bg-emerald-100 hover:bg-emerald-200 
//                         md:py-4 md:text-lg md:px-10"
//                     >
//                       Sign In
//                     </Link>
//                   </div>
//                 </div>
                
//                 {/* Added Enterprise Notice */}
//                 <p className="mt-4 text-sm text-gray-500 italic">
//                   * This is an enterprise solution. New accounts are created through our invitation system.
//                 </p>
//               </div>
//             </main>
//           </div>
//         </div>
//         <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
//         <Lottie className='relative z-50' options={defaultOptions} height={100} width={100} />

//         </div>
//       </section>

//       {/* Features Section - Updated Heading */}
//       <section className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="lg:text-center">
//             <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
//               AITechs Solutions Features
//             </h2>
//             <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//               Everything you need to manage waste collection
//             </p>
//           </div>

//           <div className="mt-10">
//             <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
//               {features.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//                 >
//                   <div>
//                     <div className="absolute h-12 w-12 flex items-center justify-center rounded-md bg-emerald-100">
//                       {feature.icon}
//                     </div>
//                     <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
//                       {feature.title}</p>
//                   </div>
//                   <div className="mt-2 ml-16 text-base text-gray-500">
//                     {feature.description}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modified CTA Section */}
//       <section className="bg-emerald-700">
//         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
//           <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
//             <span className="block">Transform your waste management</span>
//             <span className="block text-emerald-200">with AITechs Solutions today.</span>
//           </h2>
//           <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
//             <div className="inline-flex rounded-md shadow">
//               <Link
//                 to="/contact-sales"
//                 className="inline-flex items-center justify-center px-5 py-3 
//                   border border-transparent text-base font-medium rounded-md 
//                   text-emerald-600 bg-white hover:bg-emerald-50"
//               >
//                 Contact Sales
//               </Link>
//             </div>
//             <div className="ml-3 inline-flex rounded-md shadow">
//               <Link
//                 to="/about"
//                 className="inline-flex items-center justify-center px-5 py-3 
//                   border border-transparent text-base font-medium rounded-md 
//                   text-white bg-emerald-600 hover:bg-emerald-700"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer with Company Info */}
//       <footer className="bg-white border-t border-gray-200">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-gray-500 text-sm">
//             © {new Date().getFullYear()} AITechs Solutions. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default HomePage