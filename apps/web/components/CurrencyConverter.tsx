import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();
        setExchangeRate(data.rates.KRW);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch exchange rate");
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const convertedAmount = amount * exchangeRate;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-2">환율 계산기</h3>
      <div className="mb-4 relative">
        <label htmlFor="usd" className="block mb-2 absolute top-2.5 right-14">
          USD
        </label>
        <input
          id="usd"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="w-full p-2 pl-4 border rounded"
        />
      </div>
      <div>
        <div className="p-2 bg-gray-100 rounded">
          ₩
          {convertedAmount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          KRW
        </div>
      </div>
      {/* <p className="mt-4 text-sm text-gray-600">
        $1 USD = ₩{exchangeRate.toFixed(2)} KRW
      </p> */}
    </div>
  );
};

export default CurrencyConverter;
