import React, { useEffect, useState } from "react";
import './SavedData.css'

const SavedData = () => {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State to store the user being edited
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  // Fetch data from the API
  const fetchData = async () => {
    let response = await fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let jsonData = await response.json();
    setData(jsonData);
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    });
    setData(data.filter((user) => user._id !== id)); // Remove the user from the state
  };

  // Handle editing user
  const handleEdit = (user) => {
    setEditingUser(user._id); // Set the user being edited
    setFormData(user); // Pre-fill the form with the user's data
  };

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = { ...formData };

    await fetch(`http://localhost:3001/users/${editingUser}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setEditingUser(null);
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    });
    fetchData(); 
  };

  return (
    <div>
      <h2>Saved Data</h2>
      {editingUser && (
        <div>
          <h3>Edit User</h3>
          <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <br />
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <br />
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
            <br />
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
            <br />
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <br />
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
            <br />
            <label>Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
            <br />
            <label>Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />
            <br />
            <label>Expiry Date:</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
            />
            <br />
            <label>CVV:</label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
            />
            <br />
            <label>Cardholder Name:</label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
            />
            <br />
            <button type="submit">Update User</button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Card Number</th>
            <th>Expiry Date</th>
            <th>CVV</th>
            <th>Cardholder Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>{item.street}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.zipCode}</td>
              <td>{item.cardNumber}</td>
              <td>{item.expiryDate}</td>
              <td>{item.cvv}</td>
              <td>{item.cardholderName}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedData;
