import React from 'react'
import { useApplicationSettings } from '../settings/ApplicationSettings';

const CompanyInvoice = () => {

const { companySettings } = useApplicationSettings()
const { company_name, contact_info, email_info, logo_preview } = companySettings

  return (
    <div>
      <div className="bg-gray-800  dark:bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
    <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
            <img className="h-8 w-8 mr-2" src={logo_preview}
                alt="Logo" />
            <div className="dark:text-black text-white font-semibold text-lg">{company_name}</div>
        </div>
        <div className="dark:text-black text-white">
            <div className="font-bold text-xl mb-2">INVOICE</div>
            <div className="text-sm">Date: 01/05/2023</div>
            <div className="text-sm">Invoice #: INV12345</div>
        </div>
    </div>
    <div className="border-b-2 border-gray-300 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-black text-white">Bill To:</h2>
        <div className="dark:text-black text-white mb-2 ">John Doe</div>
        <div className="dark:text-black text-white mb-2">123 Main St.</div>
        <div className="dark:text-black text-white mb-2">Anytown, USA 12345</div>
        <div className="dark:text-black text-white">johndoe@example.com</div>
    </div>
    <table className="w-full text-left mb-8">
        <thead>
            <tr>
                <th className="dark:text-black text-white font-bold uppercase py-2">Description</th>
                <th className="dark:text-black text-white font-bold uppercase py-2">Quantity</th>
                <th className="dark:text-black text-white font-bold uppercase py-2">Price</th>
                <th className="dark:text-black text-white font-bold uppercase py-2">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="py-4 dark:text-black text-white">Product 1</td>
                <td className="py-4 dark:text-black text-white">1</td>
                <td className="py-4 dark:text-black text-white">$100.00</td>
                <td className="py-4 dark:text-black text-white">$100.00</td>
            </tr>
            <tr>
                <td className="py-4 dark:text-black text-white">Product 2</td>
                <td className="py-4 dark:text-black text-white">2</td>
                <td className="py-4 dark:text-black text-white">$50.00</td>
                <td className="py-4 dark:text-black text-white">$100.00</td>
            </tr>
            <tr>
                <td className="py-4 dark:text-black text-white">Product 3</td>
                <td className="py-4 dark:text-black text-white">3</td>
                <td className="py-4 dark:text-black text-white">$75.00</td>
                <td className="py-4 dark:text-black text-white">$225.00</td>
            </tr>
        </tbody>
    </table>
    <div className="flex justify-end mb-8">
        <div className="dark:text-black text-white mr-2">Subtotal:</div>
        <div className="dark:text-black text-white">$425.00</div>
    </div>
    <div className="text-right mb-8">
        <div className="dark:text-black text-white mr-2">Tax:</div>
        <div className="dark:text-black text-white">$25.50</div>

    </div>
    <div className="flex justify-end mb-8">
        <div className="dark:text-black text-white mr-2">Total:</div>
        <div className="dark:text-black text-white font-bold text-xl">$450.50</div>
    </div>
    <div className="border-t-2 border-gray-300 pt-8 mb-8">
        <div className="dark:text-black text-white mb-2">Payment is due within 30 days. Late payments are subject to fees.</div>
        <div className="dark:text-black text-white mb-2">Please make checks payable to Your Company Name and mail to:</div>
        <div className="dark:text-black text-white">123 Main St., Anytown, USA 12345</div>
    </div>
</div>
    </div>
  )
}

export default CompanyInvoice
