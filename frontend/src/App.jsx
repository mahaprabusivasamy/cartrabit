import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import OwnerLoginPage from './pages/OwnerLoginPage';
import OwnerRegisterPage from './pages/OwnerRegisterPage';
import CustomerLoginPage from './pages/CustomerLoginPage';
import CustomerRegisterPage from './pages/CustomerRegisterPage';
import RoomsPage from './pages/OwnerRoomPage';
import CustomerBookingsPage from './pages/CustomerBookingsPage';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import AvailableRoomsPage from './pages/AvailableRommPages';
import MainPage from './pages/MainPage/MainPage';
import BookingPage from './components/BookingPage';


const App = () => {
  return (
    <Router>
      <div>
      {/* define routes */}
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/owner/login" element={<OwnerLoginPage />} />
            <Route path="/owner/register" element={<OwnerRegisterPage />} />
            <Route path="/owner/dashboard/*" element={<OwnerDashboardPage />} />
            <Route path="/customer/login" element={<CustomerLoginPage />} />
            <Route path="/customer/register" element={<CustomerRegisterPage />} />
            <Route path="/customer/rooms" element={<AvailableRoomsPage/>} />
            <Route path="/customer/bookings" element={<CustomerBookingsPage />} />
            <Route path="/customer/dashboard/" element={<CustomerDashboardPage/>} />
            <Route path="/booking" element={<BookingPage/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
