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
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["userInformation", "addressInformation", "paymentInformation"];

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

  // Hardcoded API responses based on form type
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

  // Handle field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  // Form validation function
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

  // Update progress bar based on the completion of required fields
  const updateProgress = () => {
    const requiredFields = formFields.filter((field) => field.required);
    const filledFields = requiredFields.filter(
      (field) => formData[field.name] && formData[field.name] !== ""
    );
    setProgress((filledFields.length / requiredFields.length) * 100);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if there are any errors
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

  return (
    <div className="container">
      <header>
        <h1>Dynamic Form</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div>
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

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
        <div className="link-btn">
          <Link to="/saved-data">Saved Data</Link>
        </div>
      </form>
      {/* Table to show submitted data */}
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
