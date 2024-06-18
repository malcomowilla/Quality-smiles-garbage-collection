import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Signup from './Auth/Signup'
import {HomePage} from './Home/HomePage'
import SignIn from './Auth/SignIn'
import Admin from './Admin/Admin'
import Services from './services/Services'
import {useEffect} from 'react'
import {useApplicationSettings} from './settings/ApplicationSettings'
import Location from './location/Location'
import Sublocation from './location/Sublocation'
import Payment from './payment/Payment'
import Store from './store/Store'
import Collections from './collections/Collections'
import CollectionRequests from './collections/CollectionRequests'
import Expenses from './Expenses/Expenses'
import Customers from './Customers/Customers'
import ServiceProvider from './service_provider/ServiceProvider'
import ManageUsers from './user_management/ManageUsers'
import QrCode from './QrCode/QrCode'
import CustomerForm from './form/CustomerForm'
import ServiceProviderForm from './form/ServiceProviderForm'
import ProviderConfirmation  from './collections/ProviderConfirmation'
import CustomerConfirmation from './collections/CustomerConfirmation'
import ProviderCollections from './form/ProviderCollections'
import CustomerRequest from './form/CustomerRequest'
import Driver from './driver/Driver'
 import ChooseRole from './choose_role/ChooseRole'
 import  {GeneralSettings} from './settings/GeneralSettings'
import Dashboard from './dashboard/Dashboard'


const router = createBrowserRouter(

  createRoutesFromElements(
    <>
      <Route  path='/signup'  element={<Signup/>}/>
      <Route index path='/'  element={<HomePage/>}/>
      <Route  path='/signin'  element={<SignIn/>}/>

      
        
        
        
<Route  path='/admin' element={<Admin/>}>
<Route  path='/admin/location' element={<Location/>}/> 
<Route path='/admin/sublocation' element={<Sublocation/>}/>
<Route path='/admin/payment' element={<Payment/>}/>
<Route path='/admin/store' element={<Store/>}/>
<Route  path='/admin/collections' element={<Collections/>}/>
<Route  path='/admin/collection-requests' element={<CollectionRequests/>}/>
<Route path='/admin/expenses' element={<Expenses/>}/>
<Route path='/admin/customers' element={<Customers/>}/>
<Route path='/admin/service-provider' element={<ServiceProvider/>}/>
<Route path='/admin/user-management' element={<ManageUsers/>}/>
<Route path='/admin/customer-confirmation' element={<CustomerConfirmation/>}/>
<Route path='/admin/view-driver' element={<Driver/>}/>
<Route path='/admin/general-settings' element={<GeneralSettings/>}/>
<Route path='/admin/dashboard' element={<Dashboard/>}/>
<Route path='/admin/collection-confirm' element={<ProviderConfirmation />

}/>
</Route>


<Route path='/qr-code' element={<QrCode/>}/>
<Route path='/provider-collecting' element={<ProviderCollections/>}/>
<Route path='/customer-request' element={<CustomerRequest/>}/>
      <Route path='/services' element={<Services/>} />
      <Route path='/customer' element={<CustomerForm/>}/>
      <Route path='/view-driver' element={<Driver/>}/>
      <Route path='/choose_role' element={<ChooseRole/>}/>

      <Route path='/service-provider' element={<ServiceProviderForm/>}/>
      </>
      

  )
)







const App = () => {

  return (
    <>

       <RouterProvider router={router} />


    </>
  )
}

export default App