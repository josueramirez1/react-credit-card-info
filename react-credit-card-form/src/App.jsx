import { useState } from "react";
import CreditCard from "./components/CreditCard";

function App() {
  // variables
  const currentMonth = new Date().getMonth() + 1;
  const formatting = String(currentMonth).length <= 1 ? "0" : null;
  const formattedCurrentMonth = formatting + currentMonth;
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    date: currentYear + "-" + formattedCurrentMonth,
    cvv: "",
  });
  // useState
  const [side, setSide] = useState("front");
  const [message, setMessage] = useState(
    "Please enter your credit card details"
  );
  // helper functions
  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "cvv" || name === "number") {
      value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "cvv") {
      setSide("back");
      return;
    }
    setSide("front");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("Thank you for your submission!");
  }

  return (
    <div className="form-container">
      <CreditCard formData={formData} side={side} />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>
            Name on card
            <input
              name="name"
              value={formData.name}
              placeholder="Name"
              required
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Card Number
            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
              required
              minLength={16}
              maxLength={16}
            />
          </label>
        </div>
        <div className="supporting-inputs-container">
          <label>
            Expiry date
            <input
              onChange={handleChange}
              name="date"
              value={formData.date}
              required
              type="month"
            />
          </label>
          <label>
            CVV
            <input
              onChange={handleChange}
              name="cvv"
              value={formData.cvv}
              id="cvv"
              placeholder="123"
              required
              minLength={3}
              maxLength={3}
            />
          </label>
        </div>

        <div className="input-container">
          <input type="submit"></input>
        </div>
        <p className="info-message">{message}</p>
      </form>
    </div>
  );
}

export default App;
