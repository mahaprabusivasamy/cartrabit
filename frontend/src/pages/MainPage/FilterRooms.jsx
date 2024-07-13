import React, { useState, useEffect } from 'react';
import "../css/filter.css"
const FilterRooms = ({ data, onFilter }) => {
  const [filters, setFilters] = useState({
    location: '',
    // fromDate: '',
    // toDate: '',
    adults: 0,
    kids: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filteredData = data.filter((item) => {
      const isLocationMatch = filters.location ? item.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
      const isAdultsMatch = filters.adults ? item.adults >= filters.adults : true;
      const isKidsMatch = filters.kids ? item.kids >= filters.kids : true;

      return isLocationMatch && isAdultsMatch && isKidsMatch;
    });

    onFilter(filteredData);
  }, [filters, data, onFilter]);

  return (
    <div>
      {/* <h1>Filter Rooms</h1> */}
      <div className='filter'>
        <label>
          Location <span></span>
          <input type="text" name="location" placeholder='location' value={filters.location} onChange={handleChange} />
        </label> 
        <label>
          From Date <span></span>
          <input type="date" name="fromDate" value={filters.fromDate} onChange={handleChange} />
        </label>
        <label>
          To Date <span></span>
          <input type="date" name="toDate" value={filters.toDate} onChange={handleChange} />
        </label>
        <label>
          Adults <span></span>
          <input type="number" name="adults" placeholder='adults' value={filters.adults} onChange={handleChange} />
        </label>
        <label>
          Kids <span></span>
          <input type="number" name="kids" placeholder='kids' value={filters.kids} onChange={handleChange} />
        </label> 
        <button className='filterreset' onClick={() => setFilters({
          location: '',
        //   fromDate: '',
        //   toDate: '',
          adults: '',
          kids: ''
        })}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterRooms;
