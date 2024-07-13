// import React, { useState } from 'react';
// import { updateRoomDetails,deleteRoom } from '../services/room';
// import '../pages/css/Roomcard.css';

// const OwnerRoomCard = ({ room, onUpdate }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedRoom, setUpdatedRoom] = useState(room);
//   const [deleteupdatedRoom, setDeleteupdatedRoom] = useState(room);
//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     try {
//       await updateRoomDetails(updatedRoom._id, updatedRoom);
//       setIsEditing(false);
//       onUpdate();
//       alert('Room updated successfully');
//     } catch (error) {
//       console.error('Failed to update room:', error);
//       alert('Failed to update room');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedRoom((prevRoom) => ({
//       ...prevRoom,
//       [name]: value,
//     }));
//   };
// const handleDelete = async (e)=>{
// try{
//     const { name, value } = e.target;
//     setDeleteupdatedRoom((prevRoom) => ({
//       ...prevRoom,
//       [name]: value,
//     }));
//     console.log(deleteupdatedRoom._id);
//     await deleteRoom(deleteupdatedRoom._id);
//     alert("deleteed sucessfully");
// }catch(error){
//     console.error('Failed to delete room',error)
//     alert('failed to delete');
// }
// }
//   return (
//     <div className="room-card">
//       <div className="image-slider">
//         <img src={room.images[0]} alt="Room" className="slider-image" />
//       </div>
//       <div className="room-details">
//         <h3 className="room-name">{room.roomName}</h3>
//         <p>{room.floorSize}</p>
//         <p>Amenities: {room.amenities.join(', ')}</p>
//         <p>Rent: ${room.rent}</p>
//         <p>Min Day: {room.minDay}, Max Day: {room.maxDay}</p>
//       </div>
//       {isEditing ? (
//         <div>
//           <div>
//             <label>Room Name:</label>
//             <input
//               type="text"
//               name="roomName"
//               value={updatedRoom.roomName}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Floor Size:</label>
//             <input
//               type="text"
//               name="floorSize"
//               value={updatedRoom.floorSize}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Amenities:</label>
//             <input
//               type="text"
//               name="amenities"
//               value={updatedRoom.amenities}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Rent:</label>
//             <input
//               type="number"
//               name="rent"
//               value={updatedRoom.rent}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Min Day:</label>
//             <input
//               type="number"
//               name="minDay"
//               value={updatedRoom.minDay}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Max Day:</label>
//             <input
//               type="number"
//               name="maxDay"
//               value={updatedRoom.maxDay}
//               onChange={handleChange}
//             />
//           </div>
//           <button onClick={handleSave}>Save</button>
//         </div>
//       ) : (
//         <div className="div">
//         <button className="edit-button" onClick={handleEdit}>
//           Edit
//         </button>
//          <button className="edit-button" onClick={handleDelete}>
//          delete
//        </button></div>
//       )}
//     </div>
//   );
// };

// export default OwnerRoomCard;
import React, { useState } from 'react';
import { updateRoomDetails, deleteRoom } from '../services/room';
import '../pages/css/Roomcard.css';

const OwnerRoomCard = ({ room }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState(room);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

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

  const handleRemoveImage = (index) => {
    setUpdatedRoom((prevRoom) => ({
      ...prevRoom,
      images: prevRoom.images.filter((_, i) => i !== index),
    }));
  };

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
              <label>Rent:</label>
              <input
                type="number"
                name="rent"
                value={updatedRoom.rent}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Min Day:</label>
              <input
                type="number"
                name="minDay"
                value={updatedRoom.minDay}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Max Day:</label>
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
            <button onClick={handleSave}>Save</button>
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
          <button onClick={() => setIsEditing(false)}>Cancel</button>
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
