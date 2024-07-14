// src/pages/CustomerDashboardPage.jsx
import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import CustomerBookingsPage from './CustomerBookingsPage';
import AvailableRoomsPage from './AvailableRommPages';
import "./css/Mainpage.css"
import "./css/CustomerDashboardPage.css"
import MainPage from './MainPage/MainPage';
const CustomerDashboardPage = () => {
  const customer = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!customer) {
    return <div>Error: Customer data not found</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  console.log(customer);


  // customer dashboard
  return (
    <>
      <div>
        <div className="header">
          <h2 className='cusheadnamedash'>Customer Dashboard</h2>
          {/* <nav>
            <br />
            <Link to="/customer/bookings">Bookings</Link>
          </nav> */}
          <div className="cusdashbtn">
          <button onClick={handleLogout}>Logout</button></div>
        </div>
        {/* <p>Customer ID: {customer.id}</p> */}
        <div className="maindashpagecustomer">
        <p>Welcome <span>{customer.name}</span></p>
        </div>
       
        {/* <Routes>
          <Route path="/bookings" element={<CustomerBookingsPage customer={customer} />} />
        </Routes> */}
      </div>
      {/* <AvailableRoomsPage />

      <CustomerBookingsPage customer={customer}/> */}
  <MainPage/>
    </>
  );
};

export default CustomerDashboardPage;
