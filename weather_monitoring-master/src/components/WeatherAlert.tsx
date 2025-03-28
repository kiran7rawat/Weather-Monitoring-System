import React, { useState } from 'react';
import { WeatherAlert as WeatherAlertType } from '../types/weather';

interface WeatherAlertProps {
  onSubmit: (alert: WeatherAlertType) => void;
}

export const WeatherAlert: React.FC<WeatherAlertProps> = ({ onSubmit }) => {
  const [alert, setAlert] = useState<WeatherAlertType>({
    city: '',
    email: '',
    alertType: 'Temperature',
    condition: 'above',
    threshold: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(alert);
    // Reset form
    setAlert({
      city: '',
      email: '',
      alertType: 'Temperature',
      condition: 'above',
      threshold: 0,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Create Weather Alert</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            City
          </label>
          <input
            type="text"
            value={alert.city}
            onChange={(e) => setAlert({ ...alert, city: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={alert.email}
            onChange={(e) => setAlert({ ...alert, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Alert Type
          </label>
          <select
            value={alert.alertType}
            onChange={(e) => setAlert({ ...alert, alertType: e.target.value as WeatherAlertType['alertType'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Temperature">Temperature</option>
            <option value="Humidity">Humidity</option>
            <option value="WindSpeed">Wind Speed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Condition
          </label>
          <select
            value={alert.condition}
            onChange={(e) => setAlert({ ...alert, condition: e.target.value as WeatherAlertType['condition'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Threshold Value
          </label>
          <input
            type="number"
            value={alert.threshold}
            onChange={(e) => setAlert({ ...alert, threshold: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Alert
        </button>
      </form>
    </div>
  );
}