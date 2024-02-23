import React, { useState } from 'react'
import axios from 'axios'

function App() {

  const [price, setPrice] = useState("")
  var myHeaders = new Headers();
  myHeaders.append("x-access-token", "goldapi-4k4p0rlstwnhld-io");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://www.goldapi.io/api/XAU/INR/20240215", requestOptions)
    .then(response => response.json())
    .then(result => setPrice(result.price))
    .catch(error => console.log('error', error));
  return (
    <div>
      <h1>{price}</h1>
    </div>
  )
}

export default App



import React, { useState } from 'react';

function GoldRateCalculator() {
  // State variables
  const [weight, setWeight] = useState('');
  const [karat, setKarat] = useState('24k');
  const [currency, setCurrency] = useState('USD');
  const [goldRate, setGoldRate] = useState('');
  const [additionalCharges, setAdditionalCharges] = useState('');
  const [totalValue, setTotalValue] = useState('');

  // Handle weight change
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  // Handle karat change
  const handleKaratChange = (e) => {
    setKarat(e.target.value);
  };

  // Handle currency change
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  // Handle gold rate change
  const handleGoldRateChange = (e) => {
    setGoldRate(e.target.value);
  };

  // Handle additional charges change
  const handleAdditionalChargesChange = (e) => {
    setAdditionalCharges(e.target.value);
  };

  // Calculate total value
  const calculateTotalValue = () => {
    // Convert weight to grams
    const weightInGrams = parseFloat(weight);

    // Convert gold rate to currency
    const goldRateInCurrency = parseFloat(goldRate);

    // Convert additional charges to currency
    const additionalChargesValue = parseFloat(additionalCharges);

    // Calculate total value
    const totalValue = weightInGrams * (goldRateInCurrency / 31.1035) + additionalChargesValue;

    // Update state
    setTotalValue(totalValue.toFixed(2));
  };

  return (
    <div className="gold-rate-calculator">
      <h2>Gold Rate Calculator</h2>
      <div className="input-container">
        <label htmlFor="weight">Weight (grams): </label>
        <input type="number" id="weight" value={weight} onChange={handleWeightChange} />
      </div>
      <div className="input-container">
        <label htmlFor="karat">Select Karat: </label>
        <select id="karat" value={karat} onChange={handleKaratChange}>
          <option value="24k">24k</option>
          <option value="22k">22k</option>
          <option value="18k">18k</option>
          {/* Add more karat options as needed */}
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="currency">Select Currency: </label>
        <select id="currency" value={currency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Add more currency options as needed */}
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="goldRate">Gold Rate per gram ({currency}): </label>
        <input type="number" id="goldRate" value={goldRate} onChange={handleGoldRateChange} />
      </div>
      <div className="input-container">
        <label htmlFor="additionalCharges">Additional Charges ({currency}): </label>
        <input type="number" id="additionalCharges" value={additionalCharges} onChange={handleAdditionalChargesChange} />
      </div>
      <button onClick={calculateTotalValue}>Calculate</button>
      <div className="result-container">
        <h3>Total Value: {totalValue} {currency}</h3>
      </div>
    </div>
  );
}

export default GoldRateCalculator;



/*  */

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://gold-rates-india.p.rapidapi.com/api/gold-rates',
  headers: {
    'X-RapidAPI-Key': 'cc053e69abmsh090ed1c11f08b22p113386jsneba2b148f4ba',
    'X-RapidAPI-Host': 'gold-rates-india.p.rapidapi.com'
  }
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}


/* const apiUrl = `https://www.goldapi.io/api/XAU/${currency}/${dateFormat}`;
const config = {
    headers: {
        "x-access-token": "goldapi-4k4p0rlstwnhld-io",
        "Content-Type": "application/json"
    }
};
 
axios.get(apiUrl, config)
    .then(response => {
        const result = response.data;
        const pricePerGram = result[`price_gram_${karat.slice(0, 2)}`];
        const totalValue = (pricePerGram * goldweight) + ((pricePerGram * goldweight * additionalCharges) / 100);
        setTotalValue(totalValue);
    })
    .catch(error => {
        console.log('error', error);
    }); */
