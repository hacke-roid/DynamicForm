import React, { useState } from "react";
import "./DynamicFrom.css";
import { Link } from "react-router-dom";

const DynamicForm = () => {
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

  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState({});

  const formSections = [
    {
      key: "userInfo",
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
    {
      key: "addressInfo",
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
    {
      key: "paymentInfo",
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
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.required && !formData[field.name]) {
          formErrors[field.name] = `${field.label} is required`;
        }
      });
    });
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setSubmittedData((prevData) => [...prevData, formData]);
      alert("Form submitted successfully!");
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
    } else {
      alert("Please fill out all required fields.");
    }

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="dynamic-form-container">
      <header>
        <h1>Dynamic Form</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>User Information</h2>
        {formSections[0].fields.map((field, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              required={field.required}
            />
            {errors[field.name] && (
              <span className="error">{errors[field.name]}</span>
            )}
          </div>
        ))}

        <h2>Address Information</h2>
        {formSections[1].fields.map((field, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "dropdown" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                required={field.required}
              >
                <option value="">--Select--</option>
                {field.options.map((option, idx) => (
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
            {errors[field.name] && (
              <span className="error">{errors[field.name]}</span>
            )}
          </div>
        ))}

        <h2>Payment Information</h2>
        {formSections[2].fields.map((field, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              required={field.required}
            />
            {errors[field.name] && (
              <span className="error">{errors[field.name]}</span>
            )}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>

      <div className="submitted-data">
        <Link to='/saved-data'>Submitted Data</Link>
      </div>

      <footer>
        <p>&copy; 2024 Dynamic Form Application</p>
      </footer>
    </div>
  );
};

export default DynamicForm;
