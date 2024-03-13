let totalCount = 0; // Initial count
async function addBooking() {
  const name = document.getElementById('name').value;
  const seatNumber = document.getElementById('seatNumber').value;

  try {
      const response = await axios.get(`https://crudcrud.com/api/b5213632ca6f4bd6a17deebe65e702a3/bookings`);
      const bookings = response.data;

      // Check if the provided seat number is already booked
      const isSeatBooked = bookings.some(booking => booking.seatNumber === seatNumber);

      if (isSeatBooked) {
          alert(`Seat ${seatNumber} is already booked.`);
          return;
      }

      // If seat is available, proceed with adding the booking
      await axios.post('https://crudcrud.com/api/b5213632ca6f4bd6a17deebe65e702a3/bookings', { name, seatNumber });
      fetchBookings();
  } catch (error) {
      console.error('Error adding booking:', error);
  }
}

  async function fetchBookings() {
    try {
      const response = await axios.get('https://crudcrud.com/api/dc3ba96119494a409abb9da1ae9876aa/bookings');
      const bookings = response.data;
      displayBookings(bookings);
      totalCount = bookings.length; // Update the total count
      document.getElementById('totalBooked').textContent = totalCount;
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }

  function displayBookings(bookings) {
    const bookingsDiv = document.getElementById('bookings');
    bookingsDiv.innerHTML = '';
    bookings.forEach(booking => {
      const bookingDiv = document.createElement('div');
      bookingDiv.innerHTML = `<p>Name: ${booking.name}, Seat Number: ${booking.seatNumber}</p>`;

      // create edit button

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.style.backgroundColor = 'blue';
      editButton.style.borderRadius = '10px';
      editButton.style.color = 'white';


      // adding functionality to edit button

      editButton.onclick = () => editBooking(booking._id);



      // creating delete button

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.style.backgroundColor = 'red';
      deleteButton.style.borderRadius = '10px';
      deleteButton.style.color = 'white';


      // adding functionality to delete button
      
      deleteButton.onclick = () => deleteBooking(booking._id);
      bookingDiv.appendChild(editButton);
      bookingDiv.appendChild(deleteButton);
      bookingsDiv.appendChild(bookingDiv);
    });
  }


  async function editBooking(seatNumber) {
    const newName = prompt('Enter new name:');
    const newSeatNumber = prompt('Enter new seat number:');
  
    try {
      await axios.put(`https://crudcrud.com/api/dc3ba96119494a409abb9da1ae9876aa/bookings/${seatNumber}`, { name: newName, seatNumber: newSeatNumber });
      fetchBookings();
    } catch (error) {
      console.error('Error editing booking:', error);
    }
  }

  async function deleteBooking(seatNumber) {
    try {
      await axios.delete(`https://crudcrud.com/api/dc3ba96119494a409abb9da1ae9876aa/bookings/${seatNumber}`);
      fetchBookings();
      totalCount--; // Decrement total count when a booking is deleted
      document.getElementById('totalCount').textContent = totalCount;
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  }
 
  async function findWithSeatNumber(){
    try {
        const response = await axios.get('https://crudcrud.com/api/dc3ba96119494a409abb9da1ae9876aa/bookings');
        const bookings = response.data;
        const findSlot = document.getElementById('find').value.trim(); // Get the seat number to find
        let filteredBookings = [];
    
        // Filter bookings based on the provided seat number
        if (findSlot !== '') {
          filteredBookings = bookings.filter(booking => booking.seatNumber == findSlot);
        } else {
          filteredBookings = bookings;
        }
    
        displayBookings(filteredBookings); // Display filtered bookings
        totalCount = filteredBookings.length; // Update the total count based on filtered bookings
        document.getElementById('totalBooked').textContent = totalCount; // Update the count on the screen
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
  }
  fetchBookings()


