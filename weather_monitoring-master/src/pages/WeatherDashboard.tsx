import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { WeatherCard } from '../components/WeatherCard';
import { CityList } from '../components/CityList';
import { WeatherAlert } from '../components/WeatherAlert';
import { WeatherGraph } from '../components/WeatherGraph';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { CloudSun } from 'lucide-react';
import { fetchWeatherData } from '../services/weatherApi';
import { WeatherData, DailySummary } from '../types/weather';
import { INDIAN_CITIES } from '../constants/cities';

const WeatherDashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null);
  const [cities, setCities] = useState<WeatherData[]>([]);
  const { isVisible, message, showToast, hideToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCityWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(city);
      setWeatherData(data.weather);
      setDailySummary(data.summary);
      setSelectedCity(data.weather.city);
      
      // Update cities list
      setCities(prevCities => {
        const newCities = prevCities.filter(c => c.city !== data.weather.city);
        return [...newCities, data.weather].sort((a, b) => a.city.localeCompare(b.city));
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      showToast('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch weather for Mumbai initially
    fetchCityWeather('Mumbai');
    
    // Fetch weather for other Indian cities
    INDIAN_CITIES.slice(1, 6).forEach(city => {
      fetchWeatherData(city).then(data => {
        setCities(prev => {
          const newCities = prev.filter(c => c.city !== data.weather.city);
          return [...newCities, data.weather].sort((a, b) => a.city.localeCompare(b.city));
        });
      });
    });
  }, []);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      await fetchCityWeather(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <CloudSun className="text-blue-500" size={32} />
              <h1 className="text-3xl font-bold dark:text-white">Weather Monitoring System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/compare"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Compare Cities
              </Link>
              <button
                onClick={() => setIsCelsius(!isCelsius)}
                className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg dark:text-white"
              >
                {isCelsius ? '°F' : '°C'}
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg dark:text-white transition-colors"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
             
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-7">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : weatherData && dailySummary ? (
                <>
                  <WeatherCard
                    weatherData={weatherData}
                    dailySummary={dailySummary}
                    isCelsius={isCelsius}
                  />
                  <WeatherGraph
                    data={[
                      { date: 'Today', temperature: weatherData.temperature },
                      { date: 'Tomorrow', temperature: weatherData.temperature + 2 },
                      { date: 'Day 3', temperature: weatherData.temperature + 1 },
                      { date: 'Day 4', temperature: weatherData.temperature - 1 },
                      { date: 'Day 5', temperature: weatherData.temperature + 3 },
                    ]}
                    isCelsius={isCelsius}
                  />
                </>
              ) : null}
            </div>
            <div className="lg:col-span-3 space-y-6">
              <CityList
                cities={cities}
                selectedCity={selectedCity}
                onCitySelect={(city) => fetchCityWeather(city)}
                isCelsius={isCelsius}
              />
              <WeatherAlert
                onSubmit={(alert) => {
                  console.log('Alert created:', alert);
                  showToast('Weather alert created successfully!');
                }}
              />
            </div>
          </div>
        </div>

        {isVisible && (
          <Toast
            message={message}
            onClose={hideToast}
          />
        )}
      </div>
    </div>
  );
};
//Tushar Gangurde
//Chandigarh University
export default WeatherDashboard;