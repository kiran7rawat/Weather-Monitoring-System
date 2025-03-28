import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WeatherCard } from '../components/WeatherCard';
import { WeatherGraph } from '../components/WeatherGraph';
import { ArrowLeft } from 'lucide-react';
import { WeatherData, DailySummary } from '../types/weather';

const API_KEY = 'f93f58c094c3d0295ee111451259b2e6';  // Replace with your actual API key

const CompareCities: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [city1Data, setCity1Data] = useState<{ weather: WeatherData; summary: DailySummary } | null>(null);
  const [city2Data, setCity2Data] = useState<{ weather: WeatherData; summary: DailySummary } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCityData = async (city: string) => {
    try {
      console.log(`Fetching weather data for: ${city}`);
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`); 
      const weatherData = await weatherResponse.json(); 
      if (weatherResponse.ok) { 
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`); 
        const forecastData = await forecastResponse.json(); 
        if (!forecastResponse.ok) { 
          throw new Error(forecastData.message || 'Failed to fetch forecast data'); 
        } 
        const weather = { 
          city: weatherData.name, 
          countryCode: weatherData.sys.country, 
          temperature: weatherData.main.temp, 
          visibility: weatherData.visibility / 1000, 
          humidity: weatherData.main.humidity, 
          windSpeed: weatherData.wind.speed, 
          cloudiness: weatherData.clouds.all, 
          sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(), 
          sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(), 
        };

        const temps = forecastData.list.map((item: any) => item.main.temp); 
        const avgTemp = temps.reduce((acc: number, temp: number) => acc + temp, 0) / temps.length; 
        const maxTemp = Math.max(...temps); 
        const minTemp = Math.min(...temps); 
        const avgHumidity = forecastData.list.reduce((acc: number, item: any) => acc + item.main.humidity, 0) / forecastData.list.length; 
        const avgWindSpeed = forecastData.list.reduce((acc: number, item: any) => acc + item.wind.speed, 0) / forecastData.list.length; 
        const dominantCondition = forecastData.list[0].weather[0].description;
        const summary = {
          avgTemp,
          maxTemp,
          minTemp,
          avgHumidity,
          avgWindSpeed,
          dominantCondition,
        };



        console.log(`Fetched data: ${JSON.stringify({ weather, summary })}`);
        return { weather, summary };
      } else {
        console.error('Error fetching weather data:', data.message);
        setError(`City not found: ${city}`);
        return null;
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data');
      return null;
    }
  };

  const handleSearch = async (query: string, cityNumber: 1 | 2) => {
    setError(null);  // Reset any previous error messages
    if (query.trim()) {
      const data = await fetchCityData(query);
      if (data) {
        if (cityNumber === 1) {
          console.log(`Updating city1Data with: ${JSON.stringify(data)}`);
          setCity1Data(data);
        } else {
          console.log(`Updating city2Data with: ${JSON.stringify(data)}`);
          setCity2Data(data);
        }
      }
    }
  };
  //Tushar Gangurde
  //Chandigarh University
  useEffect(() => {
    // Initial data fetch
    handleSearch('London', 1);
    handleSearch('Paris', 2);
  }, []);

  const mockGraphData = (baseTemp: number) => [
    { date: '2024-03-10', temperature: baseTemp - 2 },
    { date: '2024-03-11', temperature: baseTemp },
    { date: '2024-03-12', temperature: baseTemp + 2 },
    { date: '2024-03-13', temperature: baseTemp + 1 },
    { date: '2024-03-14', temperature: baseTemp - 1 },
    { date: '2024-03-15', temperature: baseTemp },
    { date: '2024-03-16', temperature: baseTemp + 3 },
  ];
  

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
              >
                <ArrowLeft size={24} />
                <span>Back to Weather</span>
              </Link>
              <h1 className="text-3xl font-bold dark:text-white">Compare Cities</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCelsius(!isCelsius)}
                className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg dark:text-white"
              >
                {isCelsius ? '°F' : '°C'}
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg dark:text-white"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for a city..."
                  value={searchQuery1}
                  onChange={(e) => setSearchQuery1(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery1, 1)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSearch(searchQuery1, 1)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
              {error && <div className="text-red-500">{error}</div>}
              {city1Data && (
                <>
                  <WeatherCard
                    weatherData={city1Data.weather}
                    dailySummary={city1Data.summary}
                    isCelsius={isCelsius}
                  />
                  <WeatherGraph
                    data={mockGraphData(city1Data.weather.temperature)}
                    isCelsius={isCelsius}
                  />
                </>
              )}
            </div>
            <div>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for a city..."
                  value={searchQuery2}
                  onChange={(e) => setSearchQuery2(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery2, 2)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSearch(searchQuery2, 2)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
              {error && <div className="text-red-500">{error}</div>}
              {city2Data && (
                <>
                  <WeatherCard
                    weatherData={city2Data.weather}
                    dailySummary={city2Data.summary}
                    isCelsius={isCelsius}
                  />
                  <WeatherGraph
                    data={mockGraphData(city2Data.weather.temperature)}
                    isCelsius={isCelsius}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareCities;
