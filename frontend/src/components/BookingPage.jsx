import  { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import '../pages/css/BookingPage.css'; 
import { bookroom } from '../services/booking';
import { useNavigate } from 'react-router-dom';


const BookingPage = () => {
  const location = useLocation();
  const { room } = location.state; // Get room details from location state
const navigation=useNavigate();
  // State for user details
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // State for booking details
  const [bookingDetails, setBookingDetails] = useState({
    fromDate: '',
    toDate: '',
    adults: 1,
    kids: 0,
  });

  // State to toggle edit mode
  const [isEditable, setIsEditable] = useState(true);

  // State for validation error messages
  const [errors, setErrors] = useState({
    dateRange: '',
    maxAdults: '',
    maxKids: '',
  });

  // Generate a unique 10-digit booking ID
  const generateBookingId = () => {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  };

  const [bookingId, setBookingId] = useState(generateBookingId());

  // Calculate total amount
  const calculateTotalAmount = () => {
    const fromDate = new Date(bookingDetails.fromDate);
    const toDate = new Date(bookingDetails.toDate);
    const diffTime = Math.abs(toDate - fromDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalAmount = diffDays * room.rent;
    return { diffDays, totalAmount };
  };

  const { diffDays, totalAmount } = calculateTotalAmount();

  // Validate booking details
  const validateBooking = () => {
    const newErrors = {
      dateRange: '',
      maxAdults: '',
      maxKids: '',
    };
    if (diffDays < room.minDay || diffDays > room.maxDay) {
      newErrors.dateRange = `Booking must be between ${room.minDay} and ${room.maxDay} days.`;
    }
    if (bookingDetails.adults > room.adults) {
      newErrors.maxAdults = `Number of adults cannot exceed ${room.adults}.`;
    }
    if (bookingDetails.kids > room.kids) {
      newErrors.maxKids = `Number of kids cannot exceed ${room.kids}.`;
    }
    setErrors(newErrors);
    return !newErrors.dateRange && !newErrors.maxAdults && !newErrors.maxKids;
  };

  // Handle input change for user details
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle input change for booking details
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateBooking()) {
      setIsEditable(false); // Disable editing after submission
      console.log('User Details:', user);
      console.log('Booking Details:', bookingDetails);
      
    }
  };

  // Handle edit button click
  const handleEdit = () => {
    setIsEditable(true); // Enable editing
  };

  // Handle Confirm Booking button click
  const handleConfirmBooking = async () => {
    if (validateBooking()) {
      const confirm = window.confirm('Do you want to confirm the booking?');
      if (confirm) {
        const bookingData = {
          booking_id: bookingId,
          room_id: room._id,
          customer_details: user,
          from_date: bookingDetails.fromDate,
          to_date: bookingDetails.toDate,
          adults: bookingDetails.adults,
          kids: bookingDetails.kids,
          amount: totalAmount,
        };

        try {
            console.log(bookingData);
          await bookroom(bookingData);
          generatePDF();
          navigation('/');
          alert('Room booked successfully');
        } catch (error) {
          console.error('Failed to book room:', error);
          alert('Failed to book room');
        }
      }
    }
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('CART RABBIT HOTEL', 105, 20, null, null, 'center');
    doc.setFontSize(16);
    doc.text(`Booking ID: ${bookingId}`, 20, 40);
    doc.text(`Name: ${user.name}`, 20, 50);
    doc.text(`Email: ${user.email}`, 20, 60);
    doc.text(`Phone: ${user.phone}`, 20, 70);
    doc.text(`Address: ${user.address}`, 20, 80);
    doc.text(`From Date: ${bookingDetails.fromDate}`, 20, 90);
    doc.text(`To Date: ${bookingDetails.toDate}`, 20, 100);
    doc.text(`Adults: ${bookingDetails.adults}`, 20, 110);
    doc.text(`Kids: ${bookingDetails.kids}`, 20, 120);
    doc.text('Amount Details:', 20, 140);
    doc.text(`Room Rent (${diffDays} days): $${room.rent * diffDays}`, 20, 150);
    doc.text(`Total Amount: $${totalAmount}`, 20, 160);
    doc.save(`Booking_${bookingId}.pdf`);
  };

  return (
    <div className="bookingPageContainer">
      <h1>Book Room</h1>
      <div className="image-slider">
        {room.images.map((image, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${image}`}
            alt={`Room ${index + 1}`}
            className="slider-image"
          />
        ))}
      </div>
      <div className="room-details">
        <h3>{room.roomName}</h3>
        <p>{room.description}</p>
        <p>Min Day: {room.minDay}, Max Day: {room.maxDay}</p>
        <p>Rent: {room.rent}</p>
      </div>
      <form onSubmit={handleSubmit} className="user-details">
        <h3>User Details</h3>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleUserChange}
            disabled={!isEditable}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleUserChange}
            disabled={!isEditable}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleUserChange}
            disabled={!isEditable}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={user.address}
            onChange={handleUserChange}
            disabled={!isEditable}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fromDate">From Date:</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={bookingDetails.fromDate}
            onChange={handleBookingChange}
            disabled={!isEditable}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="toDate">To Date:</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={bookingDetails.toDate}
            onChange={handleBookingChange}
            disabled={!isEditable}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adults">Adults:</label>
          <input
            type="number"
            id="adults"
            name="adults"
            value={bookingDetails.adults}
            onChange={handleBookingChange}
            disabled={!isEditable}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kids">Kids:</label>
          <input
            type="number"
            id="kids"
            name="kids"
            value={bookingDetails.kids}
            onChange={handleBookingChange}
            disabled={!isEditable}
            min="0"
            required
          />
        </div>
        {errors.dateRange && <p className="error">{errors.dateRange}</p>}
        {errors.maxAdults && <p className="error">{errors.maxAdults}</p>}
        {errors.maxKids && <p className="error">{errors.maxKids}</p>}
        <button type="submit" className="confirm-button" disabled={!isEditable}>
          {isEditable ? 'Submit' : 'Confirmed'}
        </button>
        {!isEditable && (
          <button type="button" className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        )}
      </form>
      <div className="amount-details">
        <h3>Amount Details</h3>
        <table>
          <tbody>
            <tr>
              <td>Room Rent ({diffDays} days):</td>
              <td>${room.rent * diffDays}</td>
            </tr>
            <tr>
              <td>Total Amount:</td>
              <td>${totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="confirm-booking-button" onClick={handleConfirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
