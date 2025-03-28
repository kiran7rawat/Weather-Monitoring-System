import React from 'react';
import { Sunrise, Sunset, Eye, Wind, Droplets, Cloud } from 'lucide-react';
import { WeatherData, DailySummary } from '../types/weather';

interface WeatherCardProps {
  weatherData: WeatherData;
  dailySummary: DailySummary;
  isCelsius: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  dailySummary,
  isCelsius,
}) => {
  const convertTemp = (temp: number) => {
    return isCelsius ? temp : (temp * 9/5) + 32;
  };

  const formatTemp = (temp: number) => {
    return `${Math.round(convertTemp(temp))}°${isCelsius ? 'C' : 'F'}`;
  };
  const formatWindSpeed = (speed: number) => { 
    return `${speed.toFixed(3)} km/h`;
  };

  return (
    <div className="space-y-6">
      {/* Current Weather Card */}
      <div className="bg-gradient-to-r from-blue-100 to-teal-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-4 text-blue-800 dark:text-white">
          {weatherData.city} {formatTemp(weatherData.temperature)}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-800 dark:text-white">
              <Eye size={24} className="w-6 h-6 text-blue-500 dark:text-blue-300" />
              <span>Visibility: {weatherData.visibility} km</span>
            </div>
            <div className="flex items-center gap-2 text-blue-800 dark:text-white">
              <Droplets size={24} className="w-6 h-6 text-blue-500 dark:text-blue-300"/>
              <span>Humidity: {weatherData.humidity}%</span>
            </div>
            <div className="flex items-center gap-2 text-blue-800 dark:text-white">
              <Wind size={24} className="w-6 h-6 text-blue-500 dark:text-blue-300"/>
              <span>Wind: {weatherData.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-2 text-blue-800 dark:text-white">
              <Cloud size={24} className="w-6 h-6 text-blue-500 dark:text-blue-300"/>
              <span>Cloudiness: {weatherData.cloudiness}%</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-800 dark:text-white">
              <Sunrise size={24} className="w-6 h-6 text-yellow-500 dark:text-yellow-300"/>
              <span>Sunrise: {weatherData.sunrise}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-800 dark:text-white">
              <Sunset size={24} className="w-6 h-6 text-orange-500 dark:text-orange-300" />
              <span>Sunset: {weatherData.sunset}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Summary Card */}
      <div className="bg-gradient-to-r from-blue-100 to-teal-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-4 text-blue-800 dark:text-white">Daily Summary</h2>
        <div className="grid grid-cols-2 gap-4 text-purple-800 dark:text-white">
          <div className="space-y-2 text-blue-800 dark:text-white">
            <p>Average Temperature: {formatTemp(dailySummary.avgTemp)}</p>
            <p>Maximum Temperature: {formatTemp(dailySummary.maxTemp)}</p>
            <p>Minimum Temperature: {formatTemp(dailySummary.minTemp)}</p>
          </div>
          <div className="space-y-2 text-blue-800 dark:text-white">
            <p>Average Humidity: {dailySummary.avgHumidity}%</p>
            <p>Average Wind Speed: {formatWindSpeed(dailySummary.avgWindSpeed)} km/h</p>
            <p>Dominant Condition: {dailySummary.dominantCondition}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
