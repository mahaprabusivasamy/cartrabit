import React from 'react';
import { Link, Routes, Route , useNavigate} from 'react-router-dom';
import OwnerRoomsPage from './OwnerRoomPage';
import OwnerBookingsPage from './OwnerBookingsPage';
import RoomForm from '../components/RoomForm';

const OwnerDashboardPage = () => {
  const owner = JSON.parse(localStorage.getItem('user'));
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
console.log(owner)
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
            <li> <button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/owner/rooms" element={<OwnerRoomsPage ownerId={owner._id} />} />
          <Route path="/owner/bookings" element={<OwnerBookingsPage ownerId={owner._id} />} />
        </Routes>
      </main>
      <RoomForm ownerId={owner.id} />
      <OwnerRoomsPage ownerId={owner.id}/>
    </div>
  );
};

export default OwnerDashboardPage;
