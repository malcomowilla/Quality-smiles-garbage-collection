import React, { useState, useEffect } from "react";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import {Link} from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, AreaChart, Area, Tooltip, Legend, 
  ResponsiveContainer, Bar, BarChart} from 'recharts';
import AppStats from './AppStats';
import SessionTimer from './SessionTimer';
import axios from 'axios';
import {useAppSettings} from '../settings/AppSettings';
import { CiCalendar } from "react-icons/ci";
import { FaPerson } from "react-icons/fa6";
import { IoTicketSharp } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { FaPeopleCarry } from "react-icons/fa";




const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;

  if (value > 2500) {
    return (
      <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
        <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
      </svg>
    );
  }

  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red" viewBox="0 0 1024 1024">
      <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352
       179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 
       98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
    </svg>
  );
};

const Dashboard = () => {
  const [statsData, setStatsData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalServiceProviders, setTotalServiceProviders] = useState(0);
const [totalCalendarEvents, setTotalCalendarEvents] = useState(0);
const [totalUsers, setTotalUsers] = useState(0);
const {totalHrs, setTotalHrs} = useAppSettings()
const [totalTickets, setTotalTickets] = useState(0);


  const [data, setData] = useState([
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]);


  // total_users


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/customers/stats');
        const data = response.data;
        setStatsData([
          {
            name: 'Statistics',
            'Total Requests': data.total_requests || 0,
            'Total Confirmations': data.total_confirmations || 0
          }
        ]);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  // total_tickets


  
  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await axios.get('/api/total_customers');
        const data = response.data;
        setTotalCustomers(data.total_customers);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchTotalCustomers();
  }, []);





  
  useEffect(() => {
    const fetchTotaTickets = async () => {
      try {
        const response = await axios.get('/api/total_tickets');
        const data = response.data;
        setTotalTickets(data.total_tickets);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchTotaTickets();
  }, []);




  useEffect(() => {
    const fetchTotalServiceProviders = async () => {
      try {
        const response = await axios.get('/api/total_service_providers');
        const data = response.data;
        setTotalServiceProviders(data.total_service_providers);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchTotalServiceProviders();
  }, []);






  useEffect(() => {
    const fetchTotalCalendarEvents = async () => {
      try {
        const response = await axios.get('/api/total_calendar_events');
        const data = response.data;
        setTotalCalendarEvents(data.total_calendar_events);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchTotalCalendarEvents();
  }, []);




  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('/api/total_users');
        const data = response.data;
        setTotalUsers(data.total_users);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchTotalUsers();
  }, []);
  return (
    <>
    <div className="p-4">
      {/* <div className="flex justify-between items-center mb-4">
        <SessionTimer />
      </div> */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Cards
          title="Account"
          subtitle="Manage profile"
          href="#"
          Icon={FiUser}
        />
        {/* <Card title="Email" subtitle="Manage email"  Icon={FiMail} /> */}

        <Cards2  title="Team" subtitle="Manage team"
         to='/admin/user-management'  Icon={FiUsers} />


        <Cards3
          title="Billing"
          subtitle="Manage payments"
          to="/admin/payment"
          Icon={FiCreditCard}
        />
      </div>

    

      <div className="mt-6">
        <AppStats totalHrs={totalHrs} setTotalHrs={setTotalHrs}/>
      </div>
    </div>


    {/* <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Customer Activity Statistics</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total Requests" fill="#8884d8" />
              <Bar dataKey="Total Confirmations" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> */}



<div className="flex flex-wrap mb-2">
    <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
        <div className="bg-green-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <FaPeopleCarry className='w-10 h-10 text-white' />
                <div className="flex-shrink pl-1 pr-4"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                <div className="flex-1 text-right">
                    <h5 className="text-white">Total Service Providers</h5>
                    <h3 className="text-white text-3xl">{totalServiceProviders}
                      <span className="text-green-400"><i className="fas fa-caret-down"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
        <div className="bg-blue-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <IoPeopleOutline className='w-10 h-10 text-white' />
                <div className="flex-shrink pl-1 pr-4"><i className="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                <div className="flex-1 text-right">
                    <h5 className="text-white">Total Customers</h5>
                    <h3 className="text-white text-3xl">{totalCustomers} <span className="text-blue-400"><i className="fas fa-caret-up"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
        <div className="bg-orange-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <FaPerson  className='w-10 h-10 text-white' />
                <div className="flex-shrink pl-1 pr-4"><i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                <div className="flex-1 text-right pr-1">
                    <h5 className="text-white">Total Admins</h5>
                    <h3 className="text-white text-3xl">{totalUsers} <span className="text-orange-400"><i className="fas fa-caret-up"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
        <div className="bg-purple-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
                <div className="flex-shrink pl-1 pr-4"><i className="fas fa-server fa-2x fa-fw fa-inverse"></i></div>
                <div className="flex-1 text-right">
                    <h5 className="text-white">Admin Uptime</h5>
                    <h3 className="text-white text-3xl">{totalHrs}</h3>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
        <div className="bg-red-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <CiCalendar className='w-10 h-10 text-white' />
                <div className="flex-shrink pl-1 pr-4"><i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i></div>
                <div className="flex-1 text-right">
                    <h5 className="text-white">Total calendar events</h5>
                    <h3 className="text-white text-3xl">{totalCalendarEvents}</h3>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
        <div className="bg-pink-600 border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <IoTicketSharp className='w-10 h-10 text-white' />
                <div className="flex-shrink pl-1 pr-4"><i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i></div>
                <div className="flex-1 text-right">
                    <h5 className="text-white">Tickets</h5>
                    <h3 className="text-white text-3xl">{totalTickets} <span className="text-pink-400"><i className="fas fa-caret-up"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
</div>




    <div className='grid max-sm:gap-[300px] lg:gap-[280px] md:gap-[300px] 2xl:gap-[80px] max-md:gap-[300px] '>

      <div className='h-72 '>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={30} height={40} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} dot={<CustomizedDot />} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer >
      </div>

      <div className='h-72 '>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="pv" fill="#008000" background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
    </>
  );
};

const Cards = ({ title, subtitle, Icon, to }) => {
  return (
    <>
      <Link 
        to={to}
        className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group dark:bg-white"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-600 translate-y-[100%] 
        group-hover:translate-y-[0%] transition-transform duration-300" />

        <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-green-400 
        group-hover:rotate-12 transition-transform duration-300" />
        <Icon className="mb-2 text-2xl text-teal-600 group-hover:text-white transition-colors relative z-10 duration-300" />
        <h3 className="font-bold dark:text-black   text-lg text-white group-hover:text-white relative z-10 duration-300">
          {title}
        </h3>
        <p className="playwrite-de-grund font-medium dark:text-black group-hover:text-teal-200 relative
         z-10 duration-300 text-white">
          {subtitle}
        </p>
      </Link>
    </>
  );
};

const Cards2 = ({ title, subtitle, Icon, to }) => {
  return (
    <>
      <Link 
        to={to}
        className="w-full p-4 rounded border-[1px]
         border-slate-300 relative overflow-hidden group dark:bg-white 
         user-invite-card"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-600 translate-y-[100%] 
        group-hover:translate-y-[0%] transition-transform duration-300" />

        <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-green-400 
        group-hover:rotate-12 transition-transform duration-300" />
        <Icon className="mb-2 text-2xl text-teal-600 group-hover:text-white transition-colors relative z-10 duration-300" />
        <h3 className="font-bold dark:text-black   text-lg text-white group-hover:text-white relative z-10 duration-300">
          {title}
        </h3>
        <p className="playwrite-de-grund font-medium dark:text-black group-hover:text-teal-200 relative
         z-10 duration-300 text-white">
          {subtitle}
        </p>
      </Link>
    </>
  );
};

const Cards3 = ({ title, subtitle, Icon, to }) => {
  return (
    <>
      <Link 
        to={to}
        className="w-full p-4 rounded border-[1px] border-slate-300 
        relative overflow-hidden group
         dark:bg-white manage-payment-card"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-600 translate-y-[100%] 
        group-hover:translate-y-[0%] transition-transform duration-300" />

        <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-green-400 
        group-hover:rotate-12 transition-transform duration-300" />
        <Icon className="mb-2 text-2xl text-teal-600 group-hover:text-white transition-colors relative z-10 duration-300" />
        <h3 className="font-bold dark:text-black   text-lg text-white group-hover:text-white relative z-10 duration-300">
          {title}
        </h3>
        <p className="playwrite-de-grund font-medium dark:text-black group-hover:text-teal-200 relative
         z-10 duration-300 text-white">
          {subtitle}
        </p>
      </Link>
    </>
  );
};

export default Dashboard;
