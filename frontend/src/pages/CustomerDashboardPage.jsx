// src/pages/CustomerDashboardPage.jsx
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CustomerBookingsPage from './CustomerBookingsPage';
import AvailableRoomsPage from './AvailableRommPages';

const CustomerDashboardPage = () => {
  // Fetch customer data from localStorage
  const customer = JSON.parse(localStorage.getItem('user'));

  if (!customer) {
    // Handle case where customer data is not available (e.g., not logged in)
    return <div>Error: Customer data not found</div>;
  }
  console.log(customer)
  return (
    <div>
      <h2>Customer Dashboard</h2>
      <p>Customer ID: {customer.id}</p>
      <p>Customer Name: {customer.name}</p>
      <nav>
        <Link to="/customer/rooms">Rooms</Link>
        <br />
        <br />
        <Link to="/customer/bookings">Bookings</Link>
      </nav>
      <Routes>
        <Route path="/rooms" element={<AvailableRoomsPage />} />
        <Route path="/bookings" element={<CustomerBookingsPage customer={customer} />} />
      </Routes>
    </div>
  );
};

export default CustomerDashboardPage;
