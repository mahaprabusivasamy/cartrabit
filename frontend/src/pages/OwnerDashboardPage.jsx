import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import OwnerRoomsPage from './OwnerRoomPage';
import OwnerBookingsPage from './OwnerBookingsPage';

const OwnerDashboardPage = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/owner/rooms">My Rooms</Link>
            </li>
            <li>
              <Link to="/owner/bookings">Bookings</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/owner/rooms" element={<OwnerRoomsPage />} />
          <Route path="/owner/bookings" element={<OwnerBookingsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default OwnerDashboardPage;
