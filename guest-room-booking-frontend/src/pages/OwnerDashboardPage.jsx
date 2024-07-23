import React from 'react';
import { Link, Routes, Route , useNavigate} from 'react-router-dom';
import OwnerRoomsPage from './OwnerRoomPage';
import OwnerBookingsPage from './OwnerBookingsPage';
import RoomForm from '../components/RoomForm';
import "../pages/css/OwnerDashboardPage.css"
const OwnerDashboardPage = () => {
  const owner = JSON.parse(localStorage.getItem('user'));
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
console.log(owner)

// owner dashboard
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="#rooms">My Rooms</a>
            </li>
            <li>
              <Link to="/owner/bookings">Bookings</Link>
            </li>
          </ul>
          <button className='logout' onClick={handleLogout}>Logout</button>

        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/owner/rooms" element={<OwnerRoomsPage ownerId={owner._id} />} />
          <Route path="/owner/bookings" element={<OwnerBookingsPage ownerId={owner._id} />} />
        </Routes>
      </main>
      <RoomForm ownerId={owner.id} />
      <div id='rooms'>
      <OwnerRoomsPage ownerId={owner.id}/>

      </div>
    </div>
  );
};

export default OwnerDashboardPage;
