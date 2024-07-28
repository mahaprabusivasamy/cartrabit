
import  { useState } from 'react';
import { createRoom } from '../services/room';
import '../pages/css/Room.css';

const RoomForm = ({ ownerId, room, onClose }) => {
  const [roomData, setRoomData] = useState(
    room || {
      ownerId,
      roomName: '',
      floorSize: '',
      amenities: [],
      rent: 0,
      minDay: 1,
      maxDay: 20,
      images: [],
      address: '',
      description: '',
      location: '',
      adults: 0,
      kids: 0,
    }
  );

  // function to call create room api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(roomData).forEach((key) => {
        if (key === 'images') {
          roomData.images.forEach((image) => formData.append('images', image));
        } else {
          formData.append(key, roomData[key]);
        }
      });

      await createRoom(formData);
      alert('Room created successfully!');
      if (onClose) onClose();
    } catch (error) {
      console.error('Failed to create room:', error);
      alert('Failed to create room. Please try again.');
    }
  };

  // store room details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  // for amenity (for multiple data in loop)
  const handleAddAmenity = () => {
    setRoomData({ ...roomData, amenities: [...roomData.amenities, ''] });
  };


  const handleAmenityChange = (index, value) => {
    const newAmenities = [...roomData.amenities];
    newAmenities[index] = value;
    setRoomData({ ...roomData, amenities: newAmenities });
  };

  // remove amenity
  const handleRemoveAmenity = (index) => {
    const newAmenities = roomData.amenities.filter((_, i) => i !== index);
    setRoomData({ ...roomData, amenities: newAmenities });
  };

  // function for add room images
  const handleAddImage = (e) => {
    const newImages = [...roomData.images, ...Array.from(e.target.files)];
    setRoomData({ ...roomData, images: newImages });
  };

  // function for remove images
  const handleRemoveImage = (index) => {
    const newImages = roomData.images.filter((_, i) => i !== index);
    setRoomData({ ...roomData, images: newImages });
  };

  // room creation form 
  return (
    <div className="room-form-container">
      <h2>{room ? 'Edit Room' : 'Create New Room'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="left-column">
          <input type="text" name="roomName" placeholder="Room Name" value={roomData.roomName} onChange={handleChange} required />
          <input type="text" name="floorSize" placeholder="Floor Size" value={roomData.floorSize} onChange={handleChange} required />
          <input type="number" name="rent" placeholder="Rent" value={roomData.rent} onChange={handleChange} required />
          <input type="number" name="minDay" placeholder="Minimum Days" value={roomData.minDay} onChange={handleChange} required />
          <input type="number" name="maxDay" placeholder="Maximum Days" value={roomData.maxDay} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={roomData.address} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={roomData.description} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={roomData.location} onChange={handleChange} required />
          <input type="number" name="adults" placeholder="Adults" value={roomData.adults} onChange={handleChange} required />
          <input type="number" name="kids" placeholder="Kids" value={roomData.kids} onChange={handleChange} required />
        </div>
        <div className="right-column">
          <div className="amenities-container">
            <label >Amenities:</label>
            {roomData.amenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <input type="text" value={amenity} onChange={(e) => handleAmenityChange(index, e.target.value)} required />
                <button className='remove' type="button" onClick={() => handleRemoveAmenity(index)}>&#x2716;</button>
              </div>
            ))}
            <button className='amenties' type="button" onClick={handleAddAmenity}>Add Amenity</button>
          </div>
          <div className="images-container">
            <label>Images:</label>
            {roomData.images.map((image, index) => (
              <div key={index} className="image-item">
                <img src={URL.createObjectURL(image)} alt={`Room ${index + 1}`} width="200" height="200" />
                <button className='remove' type="button" onClick={() => handleRemoveImage(index)}>&#x2716;</button>
              </div>
            ))}
            <input className='upload' type="file" accept='image/png' multiple onChange={handleAddImage} />
          </div>
        </div>
        <button type="submit">{room ? 'Update Room' : 'Create Room'}</button>
      </form>
    </div>
  );
  
};

export default RoomForm;
