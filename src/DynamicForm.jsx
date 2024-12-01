import React, { useEffect, useState } from "react";
// import "./DynamicFrom.css";
import { Link } from "react-router-dom";

const DynamicForm = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const sampleResponses = {
    userInfo: {
      fields: [
        {
          name: "firstName",
          type: "text",
          label: "First Name",
          required: true,
        },
        { name: "lastName", type: "text", label: "Last Name", required: true },
        { name: "age", type: "number", label: "Age", required: false },
      ],
    },
    addressInfo: {
      fields: [
        { name: "street", type: "text", label: "Street", required: true },
        { name: "city", type: "text", label: "City", required: true },
        {
          name: "state",
          type: "dropdown",
          label: "State",
          options: ["California", "Texas", "New York"],
          required: true,
        },
        { name: "zipCode", type: "text", label: "Zip Code", required: false },
      ],
    },
    paymentInfo: {
      fields: [
        {
          name: "cardNumber",
          type: "text",
          label: "Card Number",
          required: true,
        },
        {
          name: "expiryDate",
          type: "date",
          label: "Expiry Date",
          required: true,
        },
        { name: "cvv", type: "password", label: "CVV", required: true },
        {
          name: "cardholderName",
          type: "text",
          label: "Cardholder Name",
          required: true,
        },
      ],
    },
  };

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "userInfo") {
      setFields(sampleResponses.userInfo.fields);
    } else if (selectedOption === "addressInfo") {
      setFields(sampleResponses.addressInfo.fields);
    } else if (selectedOption === "paymentInfo") {
      setFields(sampleResponses.paymentInfo.fields);
    } else {
      setFields([]);
    }
    setFormData({});
    getData();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFormData = { ...formData };

    if (editingIndex !== null) {
      // Editing existing data
      const updatedData = [...submittedData];
      updatedData[editingIndex] = newFormData;
      setSubmittedData(updatedData);
      setEditingIndex(null);
    } else {
      // Adding new data, merge user info, address info, and payment info
      const combinedData = {
        id: newFormData.id || Date.now().toString(),
        ...newFormData,
      };
      setSubmittedData((prevData) => [...prevData, combinedData]);
    }
    console.log(formData);
    setFormData({});
    saveData(newFormData);
  };

  const saveData = async (data) => {
    try {
      const method = data.id ? "PATCH" : "POST";
      const url = data.id
        ? `http://localhost:3001/users/${data.id}`
        : "http://localhost:3001/users";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (index) => {
    setFormData(submittedData[index]);
    setEditingIndex(index);
  };

  const handleDelete = async (userId, index) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const updatedData = submittedData.filter((_, i) => i !== index);
        setSubmittedData(updatedData);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getData = async () => {
    const response = await fetch("http://localhost:3001/users");
    const data = await response.json();
    setSubmittedData(data);
  };

  useEffect(() => {
    getData(); // Fetch initial data on component mount
  }, []);

  return (
    <div className="dynamic-form-container">
      <header>
        <h1>Dynamic Form</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="formType">Select Form Type</label>
          <select id="formType" onChange={handleDropdownChange}>
            <option value="">--Select--</option>
            <option value="userInfo">User Information</option>
            <option value="addressInfo">Address Information</option>
            <option value="paymentInfo">Payment Information</option>
          </select>
        </div>

        {fields.map((field, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "dropdown" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
              >
                <option value="">--Select--</option>
                {field.options?.map((option, idx) => (
                  <option value={option} key={idx}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                required={field.required}
              />
            )}
          </div>
        ))}

        <button type="submit">
          {editingIndex !== null ? "Update Data" : "Submit"}
        </button>
      </form>

      <div className="submitted-data">
        {submittedData.length > 0 ? (
          <table className="submitted-data-table">
            <thead>
              <tr>
                {fields.map((field) => (
                  <th key={field.name}>{field.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  {formData.map((field) => (
                    <td key={field.name}>{data[field.name] || "-"}</td>
                  ))}
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(data.id, index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data submitted yet.</p>
        )}
      </div>

      <div className="link-btn">
        <Link to="/saved-data">Saved Data</Link>
      </div>

      <footer>
        <p>&copy; 2024 Dynamic Form Application</p>
      </footer>
    </div>
  );
};

export default DynamicForm;
