import React from 'react';
import { WeatherData } from '../types/weather';

interface CityListProps {
  cities: WeatherData[];
  selectedCity: string;
  onCitySelect: (city: string) => void;
  isCelsius: boolean;
}

export const CityList: React.FC<CityListProps> = ({
  cities,
  selectedCity,
  onCitySelect,
  isCelsius,
}) => {
  const convertTemp = (temp: number) => {
    return isCelsius ? temp : (temp * 9/5) + 32;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Other Cities</h2>
      <div className="space-y-2">
        {cities.map((city) => (
          <button
            key={city.city}
            onClick={() => onCitySelect(city.city)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedCity === city.city
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium dark:text-white">{city.city}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {city.countryCode}
                </span>
              </div>
              <span className="font-bold dark:text-white">
                {Math.round(convertTemp(city.temperature))}°{isCelsius ? 'C' : 'F'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}