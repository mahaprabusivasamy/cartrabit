// // src/components/RoomForm.js
// import React, { useState } from 'react';
// import { createRoom } from '../services/room';

// const RoomForm = ({ room, onClose }) => {
//   const [roomData, setRoomData] = useState(
//     room || {
//       roomName: '',
//       floorSize: '',
//       amenities: [],
//       rent: 0,
//       minDay: 1,
//       maxDay: 20,
//       images: [],
//     }
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createRoom(roomData);
//       alert('Room created successfully!');
//       if (onClose) onClose();
//     } catch (error) {
//       console.error('Failed to create room:', error);
//       alert('Failed to create room. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRoomData({ ...roomData, [name]: value });
//   };

//   return (
//     <div>
//       <h2>{room ? 'Edit Room' : 'Create New Room'}</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="roomName" placeholder="Room Name" value={roomData.roomName} onChange={handleChange} required />
//         <input type="text" name="floorSize" placeholder="Floor Size" value={roomData.floorSize} onChange={handleChange} required />
//         <input type="number" name="rent" placeholder="Rent" value={roomData.rent} onChange={handleChange} required />
//         <textarea name="amenities" placeholder="Amenities (comma-separated)" value={roomData.amenities.join(',')} onChange={handleChange} required />
//         <input type="number" name="minDay" placeholder="Minimum Days" value={roomData.minDay} onChange={handleChange} required />
//         <input type="number" name="maxDay" placeholder="Maximum Days" value={roomData.maxDay} onChange={handleChange} required />
//         <input type="text" name="images" placeholder="Image URLs (comma-separated)" value={roomData.images.join(',')} onChange={handleChange} required />
//         <button type="submit">{room ? 'Update Room' : 'Create Room'}</button>
//       </form>
//     </div>
//   );
// };

// export default RoomForm;
import React, { useState } from 'react';
import { createRoom } from '../services/room';
import '../pages/css/Room.css'; // Import the CSS for styling

const RoomForm = ({ownerId, room, onClose }) => {
  console.log(ownerId)
  const [roomData, setRoomData] = useState(
    room || {
      ownerId:new Object(ownerId),
      roomName: '',
      floorSize: '',
      amenities: [],
      rent: 0,
      minDay: 1,
      maxDay: 20,
      images: [],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(roomData)
      await createRoom(roomData);
      setRoomData(room)
      alert('Room created successfully!');
      if (onClose) onClose();
    } catch (error) {
      console.log("oops")
      console.error('Failed to create room:', error);
      alert('Failed to create room. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleAddAmenity = () => {
    setRoomData({ ...roomData, amenities: [...roomData.amenities, ''] });
  };

  const handleAmenityChange = (index, value) => {
    const newAmenities = [...roomData.amenities];
    newAmenities[index] = value;
    setRoomData({ ...roomData, amenities: newAmenities });
  };

  const handleRemoveAmenity = (index) => {
    const newAmenities = roomData.amenities.filter((_, i) => i !== index);
    setRoomData({ ...roomData, amenities: newAmenities });
  };

  const handleAddImage = () => {
    setRoomData({ ...roomData, images: [...roomData.images, ''] });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...roomData.images];
    newImages[index] = value;
    setRoomData({ ...roomData, images: newImages });
  };

  const handleRemoveImage = (index) => {
    const newImages = roomData.images.filter((_, i) => i !== index);
    setRoomData({ ...roomData, images: newImages });
  };

  return (
    <div className="room-form-container">
      <h2>{room ? 'Edit Room' : 'Create New Room'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="roomName"
          placeholder="Room Name"
          value={roomData.roomName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="floorSize"
          placeholder="Floor Size"
          value={roomData.floorSize}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rent"
          placeholder="Rent"
          value={roomData.rent}
          onChange={handleChange}
          required
        />
        <div className="amenities-container">
          <label>Amenities:</label>
          {roomData.amenities.map((amenity, index) => (
            <div key={index} className="amenity-item">
              <input
                type="text"
                value={amenity}
                onChange={(e) => handleAmenityChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveAmenity(index)}>
                &#x2716;
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddAmenity}>
            Add Amenity
          </button>
        </div>
        <input
          type="number"
          name="minDay"
          placeholder="Minimum Days"
          value={roomData.minDay}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="maxDay"
          placeholder="Maximum Days"
          value={roomData.maxDay}
          onChange={handleChange}
          required
        />
        <div className="images-container">
          <label>Images:</label>
          {roomData.images.map((image, index) => (
            <div key={index} className="image-item">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                required
              />
              <img src={image} alt={`Room ${index + 1}`} width="50" height="50" />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                &#x2716;
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddImage}>
            Add Image
          </button>
        </div>
        <button type="submit">{room ? 'Update Room' : 'Create Room'}</button>
      </form>
    </div>
  );
};

export default RoomForm;
