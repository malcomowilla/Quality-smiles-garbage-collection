import React from "react";
import Lottie from 'react-lottie';
import LoadingAnimation from '../animation/loading.json';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";


export function ContactForm() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      phone_number: '',
      business_email: '',
      message: '',
      company_name: '',
      no_of_employees: '',
      expected_users: '',

    });
const { name, phone_number, business_email, message, company_name, no_of_employees, expected_users } = formData;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };



  const handleMakeRequest = async(e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch('/api/contact_requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Request submitted successfully!');
        setTimeout(() => {
          navigate('/well-be-in-touch')
        }, 5000);
        toast.success('Request submitted successfully!', {
            duration: 5000,
            position: "top-center",
            style: {
              background: "linear-gradient(to right, #ff6384, #36a2eb)",
              color: "white",
              borderRadius: "5px",
              padding: "10px",
              boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
            },
        });
        setLoading(false);
      } else {
        console.log('Failed to submit request');
        toast.error('Failed to submit request', {
            duration: 5000,
            position: "top-center",
            style: {
              background: "linear-gradient(to right, #ff6384, #36a2eb)",
              color: "white",
              borderRadius: "5px",
              padding: "10px",
              boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
            },
        })
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting request', {
          duration: 5000,
          position: "top-center",
          style: {
            background: "linear-gradient(to right, #ff6384, #36a2eb)",
            color: "white",
            borderRadius: "5px",
            padding: "10px",
            boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
          },
      })
      setLoading(false);
    }
    console.log("Form submitted");
  };


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>

{loading ? (
    <Lottie className='relative z-50' options={defaultOptions}
         height={400} width={400} />
): null}


<Toaster />

<div className='bg-white p-4 text-center rounded-lg shadow-lg'>
<p className='text-green-700 font-extrabold text-5xl'>Talk To Us</p>
</div>
    <div className="flex items-center justify-center p-12 bg-white h-screen">

    <IoIosArrowBack  className='text-black w-8 h-8 cursor-pointer absolute top-4 left-4' onClick={()=> navigate(-1)}/>
    <div className="mx-auto w-full max-w-[550px] bg-white">
     
        <form onSubmit={handleMakeRequest}>
            <div className="mb-5">  
                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                    Full Name
                </label>
                <input type="text" onChange={handleChange} value={name} name="name" id="name"
                required
                placeholder="Full Name"
                    className="w-full rounded-md border border-[#e0e0e0]
                     bg-white py-3 px-6 text-base font-medium text-[#6B7280] 
                     outline-none focus:border-[#2AAA8A] focus:shadow-md" />
            </div>

            <div className="mb-5">
                <label htmlFor="phone_number" className="mb-3 block text-base font-medium text-[#07074D]">
                    Phone Number
                </label>
                <input type="text" onChange={handleChange}
                value={phone_number}
                required
                name="phone_number" id="phone_number" placeholder="Enter your phone number"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base 
                        font-medium text-[#6B7280] outline-none focus:border-[#2AAA8A] focus:shadow-md" />
            </div>


            <div className="mb-5">
                <label htmlFor="email"   className="mb-3 block text-base font-medium text-[#07074D]"
                
                >
                    Email Address
                </label>
                <input type="email" required name="business_email" id="business_email" value={business_email}
                  onChange={handleChange} placeholder="Enter your email"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 
                    text-base font-medium text-[#6B7280] outline-none focus:border-[#2AAA8A] focus:shadow-md" />
            </div>


            <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                    Company Name
                </label>
                <input type="text"   required name='company_name'  value={company_name} onChange={handleChange}
                 placeholder="Enter Company Name"
                    className="w-full rounded-md border border-[#e0e0e0]
                     bg-white py-3 px-6 text-base font-medium text-[#6B7280] 
                     outline-none focus:border-[#2AAA8A] focus:shadow-md" />
            </div>

            <div className="mb-5">
                <label  className="mb-3 block text-base font-medium text-[#07074D]">
                    No of Employees
                </label>
                <input type="number"  required   value={no_of_employees} name='no_of_employees' onChange={handleChange}
                placeholder="Enter No of Employees"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3
                     px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#2AAA8A] focus:shadow-md" />
            </div>


            <div className="mb-5">
                <label htmlFor="expected_users" className="mb-3 block text-base font-medium text-[#07074D]">
                    Expected Number of Users(optional)(give an estimate)
                </label>
                <input type="text" required  value={expected_users} onChange={handleChange}
                 placeholder="Enter Expected Number of Users" name='expected_users'
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 
                    text-base font-medium text-[#6B7280] outline-none focus:border-[#2AAA8A] focus:shadow-md" />
            </div>

            <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Include a 
                
                short message describing your request</label>
            <textarea id="message"  required value={message} onChange={handleChange} name="message" placeholder="Enter your message here..."
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none text-black
                 focus:border-[#2AAA8A]" rows="5"></textarea>
        </div>

            

            <div>
                <button
                type="submit"
                    className="hover:shadow-form w-full rounded-md bg-green-500 py-3 px-8 text-center text-base
                     font-semibold text-white outline-none">
                    Book Appointment
                </button>
            </div>
        </form>
    </div>
</div>

</>
  );
}


