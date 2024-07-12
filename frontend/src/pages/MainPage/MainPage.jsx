// import React, {useEffect, useState}from 'react'
// import "../css/Mainpage.css"
// import { getAvailableRooms } from '../../services/room';
// import AvailableRoomPages from "../AvailableRommPages"
// import FilterRooms from './FilterRooms';
// export default function MainPage() {
//    const[rooms,setRooms]=useState('');
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const res = await getAvailableRooms();
//         console.log(res)
//         setRooms(res);
//       } catch (error) {
//         console.error('Failed to fetch rooms:', error);
//       }
//     };
//     fetchRooms();
//   }, []);
//   console.log("rooms are",rooms);
//   return (
//     <div  className='mainpage'>
//         <header>
//           <h1>Guest Room Booking</h1>
//           <nav>
//             <ul>
//               <li>
//                 {/* <Link to="/owner/login">Owner</Link> */}
//                 <a href="/owner/login">Owner</a>
//               </li>
//               <li>
//                 {/* <Link to="/customer/login">Customer</Link> */}
//                 <a href="/customer/login">Customer</a>
//               </li>
//             </ul>
//           </nav>
//         </header>

  
//           <div className="mainpageContent">

//           <AvailableRoomPages />
//           <FilterRooms data={rooms}/>
//           </div>
       

//     </div>
//   )
// }
import React, { useEffect, useState } from 'react';
import "../css/Mainpage.css";
import { getAvailableRooms } from '../../services/room';
import AvailableRoomPages from "../AvailableRommPages";
import FilterRooms from './FilterRooms';

export default function MainPage() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getAvailableRooms();
        setRooms(res);
        setFilteredRooms(res); // Initialize with all rooms
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const handleFilter = (filteredData) => {
    setFilteredRooms(filteredData);
  };

  return (
    <div className='mainpage'>
      <header>
        <h1>Guest Room Booking</h1>
        <nav>
          <ul>
            <li>
              <a href="/owner/login">Owner</a>
            </li>
            <li>
              <a href="/customer/login">Customer</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="mainpageContent">
        <div className="filterSection">
          <FilterRooms data={rooms} onFilter={handleFilter} />
        </div>
        <div className="roomsSection">
          <AvailableRoomPages rooms={filteredRooms} />
        </div>
      </div>
    </div>
  );
}
