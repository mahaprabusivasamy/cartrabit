
import { useState } from 'react';
import { updateRoomDetails, deleteRoom } from '../services/room';
import '../pages/css/Roomcard.css';

const OwnerRoomCard = ({ room }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState(room);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  

  // function to update the room details 
  const handleSave = async () => {
    try {
      await updateRoomDetails(updatedRoom._id, updatedRoom);
      setIsEditing(false);
    
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch (error) {
      console.error('Failed to update room:', error);
      alert('Failed to update room');
    }
  };

  // function to set updation details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  // function to delete the room details
  const handleDelete = async () => {
    try {
      await deleteRoom(updatedRoom._id);
      alert('Deleted successfully');
      onUpdate();
    } catch (error) {
      console.error('Failed to delete room:', error);
      alert('Failed to delete');
    }
  };

  // function to remove the room images while updation
  const handleRemoveImage = (index) => {
    setUpdatedRoom((prevRoom) => ({
      ...prevRoom,
      images: prevRoom.images.filter((_, i) => i !== index),
    }));
  };

  // adding images in room updation
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUpdatedRoom((prevRoom) => ({
        ...prevRoom,
        images: [...prevRoom.images, reader.result.split(',')[1]], // Remove data:image/jpeg;base64, part
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="room-card">
      <div className="image-slider">
        <img src={`data:image/jpeg;base64,${room.images[0]}`} alt="Room" className="slider-image" />
      </div>
      <div className="room-details">
        {isEditing ? (
          <>
            <div>
              <label>Room Name:</label>
              <input
                type="text"
                name="roomName"
                value={updatedRoom.roomName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Floor Size:</label>
              <input
                type="text"
                name="floorSize"
                value={updatedRoom.floorSize}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Amenities:</label>
              <input
                type="text"
                name="amenities"
                value={updatedRoom.amenities}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Rent:</label><br />
              <input
                type="number"
                name="rent"
                value={updatedRoom.rent}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Min Day:</label><br />
              <input
                type="number"
                name="minDay"
                value={updatedRoom.minDay}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Max Day:</label><br />
              <input
                type="number"
                name="maxDay"
                value={updatedRoom.maxDay}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Images:</label>
              <div className="image-edit-container">
                {updatedRoom.images.map((image, index) => (
                  <div key={index} className="image-edit-box">
                    <img src={`data:image/jpeg;base64,${image}`} alt="Room" />
                    <button onClick={() => handleRemoveImage(index)}>Remove</button>
                  </div>
                ))}
                <input type="file" onChange={handleAddImage} />
              </div>
            </div>
            <button className='save' onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h3 className="room-name">{room.roomName}</h3>
            <p>{room.floorSize}</p>
            <p>Amenities: {room.amenities.join(', ')}</p>
            <p>Rent: ${room.rent}</p>
            <p>Min Day: {room.minDay}, Max Day: {room.maxDay}</p>
          </>
        )}
      </div>
      <div className="button-container">
        {isEditing ? (
          <button className='edit-button' onClick={() => setIsEditing(false)}>Cancel</button>
        ) : (
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        )}
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {showSuccessPopup && <div className="success-popup">Room updated successfully</div>}
    </div>
  );
};

export default OwnerRoomCard;
