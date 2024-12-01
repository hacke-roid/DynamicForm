import React, { useState, useEffect } from "react";
import "./Dynamic.css";
import { Link } from "react-router-dom";

const DynamicForm = () => {
  const [formType, setFormType] = useState("");
  const [formFields, setFormFields] = useState([]);
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
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [editingUser, setEditingUser] = useState(false);
  //   console.log(formData);
  const handleFormChange = (e) => {
    setFormType(e.target.value);
  };

  const {
    firstName,
    lastName,
    age,
    street,
    city,
    state,
    zipCode,
    cardNumber,
    expiryDate,
    cvv,
    cardholderName,
  } = formData;

  const apiResponses = {
    userInformation: {
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
    addressInformation: {
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
    paymentInformation: {
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

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    const field = formFields.find((field) => field.name === name);
    if (field && field.required && !value) {
      error = `${field.label} is required.`;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    updateProgress();
  };

  const updateProgress = () => {
    const requiredFields = formFields.filter((field) => field.required);
    const filledFields = requiredFields.filter(
      (field) => formData[field.name] && formData[field.name] !== ""
    );
    setProgress((filledFields.length / requiredFields.length) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      alert("Please fill out the required fields correctly.");
      return;
    }
    alert("Form submitted successfully!");
    console.log("Form Data:", formData);
    if (
      firstName != "" &&
      lastName != "" &&
      age != "" &&
      street != "" &&
      city != "" &&
      state != "" &&
      zipCode != "" &&
      cardNumber != "" &&
      expiryDate != "" &&
      cvv != "" &&
      cardholderName != ""
    ) {
      fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } else {
      alert("Please fill out all the required fields.");
    }
    //   console.log(storeData
    // setFormData("")
  };

  useEffect(() => {
    if (formType) {
      setFormFields(apiResponses[formType].fields);
    }
  }, [formType]);

  const handleEditClick = () => {
    setEditingUser(true);
  };

  const handleUpdatedForm = (e) => {
    console.log("hii");
    e.preventDefault();
    console.log(formData)
    setEditingUser(false); 
  };

  return (
    <div className="container">
      <header>
        <h1>Dynamic Form</h1>
      </header>

      {/* <div>
          <label htmlFor="formType">Select Form Type</label>
          <select id="formType" onChange={handleFormChange} value={formType}>
            <option value="">Select...</option>
            <option value="userInformation">User Information</option>
            <option value="addressInformation">Address Information</option>
            <option value="paymentInformation">Payment Information</option>
          </select>
        </div>

        {formFields.length > 0 && (
          <div>
            {formFields.map((field) => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === "dropdown" ? (
                  <select
                    name={field.name}
                    id={field.name}
                    onChange={handleFieldChange}
                    value={formData[field.name] || ""}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    onChange={handleFieldChange}
                    value={formData[field.name] || ""}
                    required={field.required}
                  />
                )}
                {errors[field.name] && (
                  <span className="error">{errors[field.name]}</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div> */}
      {editingUser ? (
        <div>
          <h3>Edit User</h3>
          <div>
            <form onSubmit={handleUpdatedForm}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFieldChange}
              />
              <br />
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFieldChange}
              />
              <br />
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleFieldChange}
              />
              <br />
              <label>Street:</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleFieldChange}
              />
              <br />
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleFieldChange}
              />
              <br />
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleFieldChange}
              />
              <br />
              <label>Zip Code:</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleFieldChange}
              />
              <br />
              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleFieldChange}
              />
              <br />
              <label>Expiry Date:</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleFieldChange}
              />
              <br />
              <label>CVV:</label>
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleFieldChange}
              />
              <br />
              <label>Cardholder Name:</label>
              <input
                type="text"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleFieldChange}
              />
              <br />
              <button type="submit">Update User</button>
              <button type="button" onClick={() => setEditingUser(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="formType">Select Form Type</label>
              <select
                id="formType"
                onChange={handleFormChange}
                value={formType}
              >
                <option value="">Select...</option>
                <option value="userInformation">User Information</option>
                <option value="addressInformation">Address Information</option>
                <option value="paymentInformation">Payment Information</option>
              </select>
            </div>

            {formFields.map((field) => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === "dropdown" ? (
                  <select
                    name={field.name}
                    id={field.name}
                    onChange={handleFieldChange}
                    value={formData[field.name] || ""}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    onChange={handleFieldChange}
                    value={formData[field.name] || ""}
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      <div className="edit-btn">
      <button onClick={handleEditClick}>Edit</button>
      </div>
      <div className="link-btn">
      
        <Link to="/saved-data">Saved Data</Link>
      </div>
      {Object.keys(formData).length > 0 && (
        <div className="submitted-data">
          <h2>Submitted Data</h2>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(formData).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* 
      <div className="submitted-data">
        <h2>Submitted Data</h2>
        <table>
            <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(formData).map(([key, value])=>(
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div> */}

      <footer>
        <p>&copy; 2024 Dynamic Form Application</p>
      </footer>
    </div>
  );
};

export default DynamicForm;
