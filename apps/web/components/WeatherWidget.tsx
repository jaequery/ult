import React, { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [zipcode, setZipcode] = useState<string>("90210");
  const [city, setCity] = useState<string>("Los Angeles");
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3 className="text-lg font-bold">Today's Weather</h3>
      <div className="flex justify-center">
        <img
          alt="weather"
          src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
        />
      </div>
      <div className="flex gap-2 items-center justify-center mt-2">
        <p>Current</p>
        <p>{Math.round(weatherData?.main.temp || 0)}°F</p>
      </div>
      <div className="flex gap-2 items-center justify-center mt-2">
        <p>
          {Math.round(weatherData?.main.temp_min || 0)}°F /{" "}
          {Math.round(weatherData?.main.temp_max || 0)}°F
        </p>
      </div>

      <div className="flex flex-col items-center mt-2">
        <select
          className="border border-gray-300 rounded-md p-2 text-sm w-full"
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="Los Angeles">Los Angeles</option>
          <option value="San Francisco">San Francisco</option>
          <option value="San Diego">San Diego</option>
          <option value="San Jose">San Jose</option>
          <option value="San Francisco">San Francisco</option>
        </select>
      </div>
    </div>
  );
};

export default WeatherWidget;
