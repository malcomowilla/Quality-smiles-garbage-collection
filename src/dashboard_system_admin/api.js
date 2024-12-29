// quality-smiles/src/services/api.js

const API_URL = 'api'; // Adjust this URL based on your Rails API endpoint
import { toast } from 'react-toastify';

// Function to fetch clients from the backend
export const fetchClients = async () => {
  try {
    const response = await fetch(`${API_URL}/clients`);
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
};

// Function to invite a new client
export const inviteClient = async ({ email, user_name, phone_number, company_domain_or_subdomain }) => {
  try {
    const response = await fetch('/api/invite_client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        user_name,
        phone_number,
        company_domain_or_subdomain,
      }),
    });

    // Check if the response is successful
    if (response.ok) {
      const data = await response.json(); // Parse the JSON response
      return data; // Return the data if successful
    } else if (response.status === 422) {
      const errorData = await response.json(); // Parse the error response
      // Display specific error messages if available
      
      toast.error('Username: ' + (errorData.errors.user_name ? errorData.errors.user_name[0] : 'Please check your input.'));

toast.error('Email: ' + (errorData.errors.email ? errorData.errors.email[0] : 'Please check your input.'));



      return errorData; // Return the error data
    } else {
      // Log the error response for other status codes
      console.error('Error response from server:', response.statusText);
      toast.error('Something went wrong, please try again');
      return null; // Return null for other errors
    }
  } catch (error) {
    // Log the error message
    console.error('Error inviting client:', error);
    toast.error('Something went wrong, please try again');
    throw error; // Rethrow the error to be handled in the component
  }
};

// Function to block a client
export const blockClient = async (clientId) => {
  try {
    const response = await fetch(`${API_URL}/clients/${clientId}/block`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Failed to block client');
    }
    return await response.json();
  } catch (error) {
    console.error('Error blocking client:', error);
  }
};